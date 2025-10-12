#!/usr/bin/env node
// script/grade.cjs
// Autograder for Study Buddy Lab (Tasks: Router + Registration form)
// Node 18+ (CommonJS). Run: node script/grade.cjs
// Output: human readable report + JSON for CI (also writes grading_report.txt and grading_report.json)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function readSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); }
  catch (e) { return ''; }
}
function exists(p) { try { return fs.existsSync(p); } catch { return false; } }
function nowISO() { return (new Date()).toISOString(); }

// -------------------- Config / Due date --------------------
// Due: 2025-10-13 23:59 Riyadh (UTC+3) => 2025-10-13T20:59:00Z
const DUE_ISO_UTC = '2025-10-13T20:59:00Z';

// -------------------- File discovery --------------------
const projectRoot = process.cwd();
const candidates = {
  app: ['src/App.jsx','src/App.js','src/app.jsx','src/app.js','src/index.jsx','src/index.js'],
  registration: ['src/pages/Registration.jsx','src/pages/Registration.js','src/Registration.jsx','src/Registration.js','src/pages/registration.jsx','src/pages/registration.js']
};

function findFirst(list) {
  for (const p of list) {
    const full = path.join(projectRoot, p);
    if (exists(full)) return full;
  }
  return null;
}

const filePaths = {
  app: findFirst(candidates.app),
  registration: findFirst(candidates.registration)
};

const appText = filePaths.app ? readSafe(filePaths.app) : '';
const regText = filePaths.registration ? readSafe(filePaths.registration) : '';

// collect all src JS/JSX for broader searches
let allSrcText = '';
function collectSrcText(dir = path.join(projectRoot, 'src')) {
  try {
    const items = fs.readdirSync(dir);
    items.forEach(it => {
      const full = path.join(dir, it);
      try {
        const stat = fs.statSync(full);
        if (stat.isDirectory()) collectSrcText(full);
        else if (stat.isFile() && (full.endsWith('.js') || full.endsWith('.jsx'))) {
          allSrcText += '\n' + readSafe(full);
        }
      } catch {}
    });
  } catch {}
}
collectSrcText();

// -------------------- Helpers --------------------
function checkRegex(fileText, regex) {
  if (!fileText) return false;
  return regex.test(fileText);
}
function checkAny(fileText, arr) {
  if (!fileText) return false;
  return arr.some(a => (a instanceof RegExp) ? a.test(fileText) : fileText.indexOf(a) !== -1);
}

// -------------------- TASK 1: React Router --------------------
const t1 = {
  name: 'Apply React Router',
  checks: {
    importRouter: checkAny(appText, [/from\s+['"]react-router-dom['"]/]),
    navlinkPresent: checkAny(allSrcText || appText, [/<NavLink\b/, /NavLink\s*to\s*=/]),
    routesPresent: checkAny(allSrcText || appText, [/<Routes\b/, /<Route\b/]),
    routeHome: checkAny(allSrcText || appText, [/<Route[^>]*path\s*=\s*['"]\/['"]/, /<Route[^>]*path\s*=\s*['"]\/['"][^>]*element\s*=\s*{[^}]*<Home/]),
    routeAbout: checkAny(allSrcText || appText, [/path\s*=\s*['"]\/about['"]/, /\/about["']/]),
    routeRegistration: checkAny(allSrcText || appText, [/path\s*=\s*['"]\/registration['"]/, /\/registration["']/]),
    notFoundRoute: checkAny(allSrcText || appText, [/path\s*=\s*['"]\*['"]/, /404\s*—\s*Not Found/, /Not Found<\/h2>/])
  }
};

// -------------------- TASK 2: Registration form --------------------
const t2 = {
  name: 'Registration Form Enhancements',
  checks: {
    passwordState: checkAny(regText, [/const\s*\[\s*password\s*,\s*setPassword\s*\]/, /useState\(\s*""\s*\).*password/]),
    genderState: checkAny(regText, [/const\s*\[\s*gender\s*,\s*setGender\s*\]/, /useState\(\s*""\s*\).*gender/]),
    passwordInput: checkAny(regText, [/id\s*=\s*['"]password['"]/, /type\s*=\s*['"]password['"]/]),
    genderRadios: checkAny(regText, [/type\s*=\s*['"]radio['"]/ , /name\s*=\s*['"]gender['"]/]),
    errorsObject: checkRegex(regText, /const\s+nextErrors\s*=\s*{?\s*}/),
    emailValidation_includesAt: checkRegex(regText, /email\s*\.includes\s*\(\s*['"]@['"]\s*\)/),
    emailValidation_endsWithCom: checkRegex(regText, /email\s*\.endsWith\s*\(\s*['"]\.com['"]\s*\)/),
    disabledButton: checkRegex(regText, /disabled\s*=\s*{[^}]*(!email|!password|!gender)[^}]*}/) || checkRegex(regText, /disabled\s*=\s*{\s*!email\s*\|\|\s*!password\s*\|\|\s*!gender\s*}/),
    alertPlacementAfterErrors: checkRegex(regText, /setErrors\s*\(\s*nextErrors\s*\)\s*;\s*if\s*\(\s*Object\.keys\s*\(\s*nextErrors\s*\)\.length\s*>\s*0\s*\)\s*return\s*;[\s\S]*alert\s*\(/) ||
                               checkRegex(regText, /if\s*\(\s*Object\.keys\s*\(\s*nextErrors\s*\)\.length\s*>\s*0\s*\)\s*return\s*;[\s\S]*alert\s*\(/)
  }
};

t2.checks.emailValidation = t2.checks.emailValidation_includesAt && t2.checks.emailValidation_endsWithCom;

// -------------------- Scoring --------------------
function scoreTask1(checks) {
  const completeness = (checks.importRouter ? 3 : 0) + (checks.navlinkPresent ? 4 : 0) + (checks.routesPresent ? 4 : 0) + ((checks.routeHome && checks.routeAbout && checks.routeRegistration) ? 4 : 0);
  const correctness = ((checks.routeHome && checks.routeAbout && checks.routeRegistration) ? 9 : 0) + (checks.notFoundRoute ? 6 : 0);
  const quality = (checks.navlinkPresent && checks.importRouter ? 6 : 0) + (checks.notFoundRoute ? 4 : 0);
  return { total: completeness + correctness + quality, breakdown: { completeness, correctness, quality, checks } };
}
function scoreTask2(checks) {
  const completeness = (checks.passwordState ? 5 : 0) + (checks.genderState ? 5 : 0) + ((checks.passwordInput && checks.genderRadios) ? 5 : 0);
  const correctness = (checks.emailValidation ? 8 : 0) + (checks.errorsObject ? 4 : 0) + (checks.alertPlacementAfterErrors ? 3 : 0);
  const quality = (checks.disabledButton ? 5 : 0) + ((checks.errorsObject && checks.emailValidation) ? 5 : 0);
  return { total: completeness + correctness + quality, breakdown: { completeness, correctness, quality, checks } };
}

const scored1 = scoreTask1(t1.checks);
const scored2 = scoreTask2(t2.checks);

let tasksTotal = scored1.total + scored2.total;
const attempted = Object.values(t1.checks).some(Boolean) || Object.values(t2.checks).some(Boolean);
if (attempted && tasksTotal < 60) tasksTotal = 60;

// -------------------- Submission points --------------------
let commitTime = null;
if (process.env.COMMIT_TIME) {
  const parsed = Date.parse(process.env.COMMIT_TIME);
  if (!isNaN(parsed)) commitTime = new Date(parsed);
}
if (!commitTime) {
  try {
    const gitTime = execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim();
    const parsed = Date.parse(gitTime);
    if (!isNaN(parsed)) commitTime = new Date(parsed);
  } catch {}
}
if (!commitTime) commitTime = new Date();

const dueDate = new Date(DUE_ISO_UTC);
const onTime = commitTime.getTime() <= dueDate.getTime();
const submissionPoints = onTime ? 20 : 10;
const finalTotal = tasksTotal + submissionPoints;

// -------------------- Build reports --------------------
function sectionReport(title, scored, maxPerTask = 40) {
  const lines = [];
  lines.push(`${title}`);
  lines.push(`Score: ${scored.total}/${maxPerTask}`);
  lines.push('');
  lines.push(`Correctness — ${scored.breakdown.correctness}/15`);
  lines.push('What you achieved:');
  if (scored.breakdown.correctness > 0) {
    if (title.toLowerCase().includes('router')) {
      if (t1.checks.routeHome) lines.push('✅ Home route present');
      if (t1.checks.routeAbout) lines.push('✅ About route present');
      if (t1.checks.routeRegistration) lines.push('✅ Registration route present');
      if (t1.checks.notFoundRoute) lines.push('✅ Catch-all 404 route present');
    } else {
      if (t2.checks.emailValidation) lines.push('✅ Email validation (includes "@" and endsWith(".com"))');
      if (t2.checks.alertPlacementAfterErrors) lines.push('✅ Success alert placed after validation check');
    }
  } else {
    lines.push('❌ No correctness checks passed yet.');
  }

  lines.push('');
  lines.push(`Completeness — ${scored.breakdown.completeness}/15`);
  lines.push('What you achieved:');
  if (scored.breakdown.completeness > 0) {
    if (title.toLowerCase().includes('router')) {
      if (t1.checks.importRouter) lines.push('✅ Router primitives imported from react-router-dom');
      if (t1.checks.navlinkPresent) lines.push('✅ NavLink(s) present in navbar');
      if (t1.checks.routesPresent) lines.push('✅ <Routes> or <Route> present');
    } else {
      if (t2.checks.passwordState) lines.push('✅ password state variable added');
      if (t2.checks.genderState) lines.push('✅ gender state variable added');
      if (t2.checks.passwordInput) lines.push('✅ password input exists');
      if (t2.checks.genderRadios) lines.push('✅ gender radio inputs exist');
    }
  } else {
    lines.push('❌ No completeness checks passed yet.');
  }

  lines.push('');
  lines.push(`Code Quality — ${scored.breakdown.quality}/10`);
  lines.push('What you achieved:');
  if (scored.breakdown.quality > 0) {
    if (title.toLowerCase().includes('router')) {
      if (t1.checks.navlinkPresent) lines.push('✅ NavLink + imports suggests readable structure');
      if (t1.checks.notFoundRoute) lines.push('✅ 404 route improves UX');
    } else {
      if (t2.checks.disabledButton) lines.push('✅ Register button disabled until required fields are filled');
      if (t2.checks.errorsObject) lines.push('✅ errors object present to hold validation messages');
    }
  } else {
    lines.push('❌ Code quality suggestions not yet satisfied.');
  }

  lines.push('');
  lines.push('Checks performed:');
  const checkEntries = title.toLowerCase().includes('router') ? t1.checks : t2.checks;
  Object.entries(checkEntries).forEach(([k,v]) => lines.push(`  - ${k}: ${v ? 'passed' : 'missing'}`));
  return lines.join('\n');
}

const reportLines = [];
reportLines.push('Study Buddy Lab — Grading Report');
reportLines.push(`Commit Time: ${commitTime.toISOString()}`);
reportLines.push(`Due Date: 2025-10-13T23:59:00+03:00`);
reportLines.push(`Submission: ${submissionPoints}/20 (${onTime ? 'On time' : 'Late'})`);
reportLines.push('');
reportLines.push('Files detected:');
if (filePaths.app) reportLines.push(`${path.basename(filePaths.app)}: ${path.resolve(filePaths.app)}`);
if (filePaths.registration) reportLines.push(`${path.basename(filePaths.registration)}: ${path.resolve(filePaths.registration)}`);
if (!filePaths.app && !filePaths.registration) reportLines.push('(No top-level files detected under expected paths.)');
reportLines.push('');
reportLines.push(sectionReport('Task 1 — Apply React Router', scored1));
reportLines.push('');
reportLines.push(sectionReport('Task 2 — Registration Form Enhancements', scored2));
reportLines.push('');
reportLines.push('Totals');
reportLines.push(`Tasks Total: ${tasksTotal}/80`);
reportLines.push(`Submission: ${submissionPoints}/20`);
reportLines.push(`Grand Total: ${finalTotal}/100`);
reportLines.push('');
const reportText = reportLines.join('\n');

// JSON output
const jsonOut = {
  generatedAt: nowISO(),
  commitTime: commitTime.toISOString(),
  dueDate: DUE_ISO_UTC,
  submission: { points: submissionPoints, onTime },
  files: filePaths,
  taskScores: {
    task1: { total: scored1.total, breakdown: scored1.breakdown },
    task2: { total: scored2.total, breakdown: scored2.breakdown }
  },
  tasksTotal,
  finalTotal,
  attempted
};

// -------------------- Print + Save --------------------
try {
  // Print human readable report
  console.log('🧾 --- FEEDBACK REPORT --- 🧾');
  console.log(reportText);

  // Print JSON output
  console.log('\n-- JSON OUTPUT --\n');
  console.log(JSON.stringify(jsonOut, null, 2));

  // Save copies to files for artifact upload
  try {
    const outTxt = path.join(projectRoot, 'grading_report.txt');
    const outJson = path.join(projectRoot, 'grading_report.json');
    fs.writeFileSync(outTxt, reportText, 'utf8');
    fs.writeFileSync(outJson, JSON.stringify(jsonOut, null, 2), 'utf8');
    console.log(`\n✅ Wrote reports to:\n  - ${outTxt}\n  - ${outJson}`);
  } catch (e) {
    console.warn('⚠️ Warning: failed to write report files:', e && e.message);
  }

  console.log('\n✅ Grading completed successfully!');
} catch (err) {
  console.error('❌ Error while producing report:', err && err.stack ? err.stack : err);
}

// Exit 0 to not fail CI by default
process.exit(0);
