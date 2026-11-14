(function () {
  var root = document.getElementById('root'), docEl = document.documentElement;
  var bR = document.getElementById('lens-research'), bI = document.getElementById('lens-industry');
  function setLens(l) { root.setAttribute('data-lens', l); bR.setAttribute('aria-pressed', l === 'research'); bI.setAttribute('aria-pressed', l === 'industry'); }
  bR.addEventListener('click', function () { setLens('research'); });
  bI.addEventListener('click', function () { setLens('industry'); });

  var editions = ['foil', 'polychrome', 'plain'], edVals = [1, 2, 0], edIdx = 0, edVal = 1, edBtn = document.getElementById('edition');
  function setEdition(k) { edIdx = k; edVal = edVals[k]; docEl.setAttribute('data-edition', editions[k]); edBtn.textContent = '[ ' + editions[k] + ' ]'; }
  edBtn.addEventListener('click', function () { setEdition((edIdx + 1) % 3); });
  setEdition(0);

  /* DBS: medians from per_condition.csv (short trains, usable files, neurons with a baseline) */
  var DBS = { freqs: [1, 2, 3, 5, 10, 20, 30, 50, 100], reg: [
    { k: 'STN', n: 27, c: 'var(--rose)', v: [93, 92, 106, 102, 90, 91, 85, 28, 12] },
    { k: 'SNr', n: 14, c: 'var(--plum)', v: [108, 99, 94, 86, 74, 49, 17, 9, 6] },
    { k: 'Vim', n: 9, c: 'var(--teal)', v: [102, 113, 138, 147, 205, 196, 181, 268, 768] },
    { k: 'Rt', n: 11, c: 'var(--gold)', v: [141, 162, 160, 186, 282, 314, 541, 806, 1215] } ] };
  var SVGNS = 'http://www.w3.org/2000/svg';
  function sv(tag, attrs, parent, text) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (text !== undefined) e.textContent = text; parent.appendChild(e); return e; }
  function drawChart(svg, sel) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var L = 34, R = 262, T = 14, B = 196, lo = Math.log(4), hi = Math.log(2000);
    function X(i) { return L + (R - L) * i / 8; }
    function Y(v) { return T + (B - T) * (1 - (Math.log(v) - lo) / (hi - lo)); }
    [10, 100, 1000].forEach(function (v) {
      sv('line', { x1: L, x2: R, y1: Y(v), y2: Y(v), 'class': 'ax', 'stroke-dasharray': v === 100 ? '0' : '2 3' }, svg);
      sv('text', { x: L - 4, y: Y(v) + 3, 'text-anchor': 'end' }, svg, String(v));
    });
    sv('text', { x: 4, y: 9 }, svg, '% of baseline');
    DBS.freqs.forEach(function (f, i) { sv('text', { x: X(i), y: B + 13, 'text-anchor': 'middle' }, svg, String(f)); });
    sv('text', { x: L, y: B + 25 }, svg, 'stimulation frequency (Hz)');
    sv('line', { x1: X(sel), x2: X(sel), y1: T, y2: B, stroke: 'var(--ink)', 'stroke-width': 1 }, svg);
    DBS.reg.forEach(function (r) {
      var pts = r.v.map(function (v, i) { return X(i).toFixed(1) + ',' + Y(v).toFixed(1); }).join(' ');
      var pl = sv('polyline', { points: pts, 'class': 'ser' }, svg); pl.style.stroke = r.c;
      var dot = sv('circle', { cx: X(sel), cy: Y(r.v[sel]), r: 3.5 }, svg); dot.style.fill = r.c;
      var lab = sv('text', { x: R + 6, y: Y(r.v[8]) + 3 }, svg, r.k); lab.style.fill = r.c; lab.style.fontWeight = '700';
    });
  }
  var freqEl = document.getElementById('stim-freq'), freqOut = document.getElementById('stim-out'), dbsRead = document.getElementById('dbs-read'), dbsChart = document.getElementById('dbs-chart');
  var freq = 20, freqIdx = 5, rates = [1, 1, 1, 1];
  function setFreq(i) {
    freqIdx = i; freq = DBS.freqs[i]; freqOut.textContent = freq + ' Hz';
    while (dbsRead.firstChild) dbsRead.removeChild(dbsRead.firstChild);
    DBS.reg.forEach(function (r, j) {
      rates[j] = Math.min(2.8, 0.9 * Math.pow(r.v[i] / 100, 0.45));
      var s = document.createElement('span'), d = document.createElement('span'); d.className = 'dot'; d.style.background = r.c;
      s.appendChild(d); s.appendChild(document.createTextNode(r.k + ' ' + r.v[i] + '%')); dbsRead.appendChild(s);
    });
    drawChart(dbsChart, i);
    var big = document.getElementById('sheet-chart'); if (big) drawChart(big, i);
  }
  freqEl.addEventListener('input', function () { setFreq(Number(freqEl.value)); });
  setFreq(5);

  /* which screen are we on */
  var secs = Array.prototype.slice.call(document.querySelectorAll('.screen'));
  function scrollPos() {
    var y = window.scrollY, n = secs.length;
    for (var i = n - 1; i >= 0; i--) {
      var top = secs[i].offsetTop;
      if (y >= top) return i === n - 1 ? n - 1 : Math.min(n - 1, i + (y - top) / Math.max(1, secs[i + 1].offsetTop - top));
    }
    return 0;
  }
  var railLinks = Array.prototype.slice.call(document.querySelectorAll('#rail a')), railOn = -1;
  function updateRail() {
    var k = Math.round(scrollPos()); if (k === railOn) return; railOn = k;
    railLinks.forEach(function (a, i) { a.classList.toggle('on', i === k); if (i === k) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  window.addEventListener('scroll', updateRail, { passive: true }); window.addEventListener('resize', updateRail); updateRail();

  /* case files */
  var CASES = {
    fet: { meta: [['Status', 'In progress'], ['Role', 'Fabrication and simulation'], ['With', 'Prof. Harry Ruda ; Lucy Su']], title: 'InAs NANOWIRE FET SENSOR', kicker: '01 · Sep 2026 – present · Ruda Group, University of Toronto',
      problem: 'Most biosensors need fluorescent labels and bench instruments. A nanowire transistor can read a binding event directly as a change in current, because nearly all of its atoms sit at the surface.',
      approach: ['Drop-cast InAs nanowires onto p⁺ Si / SiO₂ (100 nm) substrates and mapped them by optical microscopy.', 'Patterned source and drain contacts by LOR2A / S1811 bilayer photolithography at the Toronto Nanofabrication Centre.', 'Set up molecular-dynamics simulations of the nanowire–electrolyte interface to map the electrostatic potential.'],
      result: 'In progress. Nanowires are placed, the contact pattern is exposed, and the first simulations are running.',
      next: '(NH₄)₂S passivation, Ti/Au metallization and lift-off, then wire bonding. After that: pH sensing in PBS and biotin–streptavidin detection, with a PDMS microfluidic flow cell for analyte delivery.',
      stack: ['Photolithography', 'Optical microscopy', 'Molecular dynamics', 'Python'], fig: { tpl: 'tpl-fet', cap: 'The device in cross-section' } },
    dbs: { meta: [['Status', 'Analysis done ; validation ongoing'], ['Role', 'Data analysis and literature review'], ['With', 'Vahid Attari'], ['Data', 'Milosevic et al. 2021']], title: 'DEEP BRAIN STIMULATION', kicker: '02 · Oct 2026 – present · Milosevic et al. 2021 dataset',
      problem: 'Deep brain stimulation treats Parkinson’s disease and tremor, yet the same pulse suppresses neurons in some nuclei and excites them in others. Working out why starts with single-neuron firing rates across stimulation frequencies.',
      approach: ['Read 749 Spike2 recordings of 115 neurons (STN, SNr, Vim, Rt) with Python and Neo.', 'Detected spikes by threshold, blanking the stimulation artifact after each pulse.', 'Corrected mislabelled stimulation frequencies and flagged unusable files.', 'Wrote a 16-source review of DBS mechanisms to frame follow-on modelling.'],
      result: '737 of 749 files were usable. At 100 Hz, median firing fell to 12% of baseline in STN and 6% in SNr, while Vim and Rt rose with frequency.',
      next: 'Check the size of the Vim and Rt increase at 50–100 Hz against residual stimulation artifact, then compare with the published values.',
      stack: ['Python', 'Neo', 'Spike detection', 'Pandas', 'Google Colab'], fig: { chart: true, cap: 'Median firing rate, % of baseline, by nucleus' } },
    agent: { meta: [['Status', 'In progress'], ['Role', 'Design and implementation'], ['With', 'Vahid Attari']], title: 'MAGNETIC-MATERIALS AGENT', kicker: '03 · Sep 2026 – present · University of Toronto',
      problem: 'Magnetic property data is locked in the text, tables and figures of thousands of papers. Manual curation is slow, and an LLM on its own makes errors that look plausible.',
      approach: ['Built a LangGraph pipeline: load the PDF, filter relevant passages, extract Ms, Mr, Hc, μ₀Hc, Jr and (BH)max as structured JSON with the Claude API.', 'Added a rule-based physics validator: Mr ≤ Ms, unit checks, and every value must quote its source.', 'Routed validator failures back to the extractor with feedback, as a self-correction loop.'],
      result: 'In a fault-injection pilot with three repeats per condition, the loop raised accuracy from 87.5% to 100% for one extra LLM call.',
      next: 'A hand-labelled benchmark of 10–12 Nd–Fe–B permanent-magnet papers, with a focus on tables and figures.',
      stack: ['LangGraph', 'Claude API', 'Python', 'LangSmith', 'GitHub'], fig: { tpl: 'tpl-agent', cap: 'The pipeline and its self-correction loop' } },
    wires: { meta: [['Status', 'Done'], ['Role', 'Design, deposition and imaging'], ['Where', 'NE 454D lab, University of Waterloo']], title: 'MULTI-SEGMENT METAL NANOWIRES', kicker: '04 · Fall 2025 · NE 454D, University of Waterloo',
      problem: 'A nanowire made of several metals can combine jobs in one strand: magnetic handling, catalysis, conduction. Building one needs control over the length of every segment.',
      approach: ['Electrodeposited eight segments (Ag, Pd, Au, Ni) inside 0.2 µm track-etched polycarbonate templates.', 'Set each segment’s length with Faraday’s law, by counting the charge passed.', 'Released the wires by selectively etching silver, including a designed gap of about 2 µm.', 'Checked the result by SEM.'],
      result: 'Released wires were 15–20 µm long and 200–250 nm wide, matching the template.',
      next: '', stack: ['Electrodeposition', 'SEM', 'Process design'], fig: { set: 'wires' } },
    christie: { kind: 'job', meta: [['Role', 'Optical Engineering Co-op'], ['When', 'Jan – Apr 2025'], ['Where', 'Kitchener, Ontario']], title: 'CHRISTIE DIGITAL', kicker: 'Experience · Laser projection',
      problem: 'A laser projector heats up as it runs, and the heat shifts the focus of its lens. To fix that you first need to measure it: how far the focus moves, how fast, and at what temperature.',
      approach: ['Built a camera-based measurement of focus drift, using contrast autofocus and single-pixel intensity tracking on the projected image.', 'Ran automated thermal tests lasting several hours through the Testinator APIs.', 'Analysed more than 100 test cycles in Python with the thermal team.', 'Characterized optical parts and beams: anti-reflection, colour and polarization filters, diffusers and 3D glasses, by spectrometry, transmission spectroscopy, beam profiling and speckle analysis.'],
      result: 'A repeatable way to quantify thermally induced defocus, with data from 100+ cycles for the thermal team to work from.', next: '',
      stack: ['Python', 'Camera metrology', 'Spectrometry', 'BeamGage', 'Test automation'], fig: { tpl: 'tpl-focus', cap: 'How the focus drift was measured' } },
    fluidai: { kind: 'job', meta: [['Role', 'R&D Engineering Associate'], ['When', 'Sep 2023 – Apr 2024'], ['Where', 'Kitchener, Ontario']], title: 'FLUIDAI MEDICAL', kicker: 'Experience · Medical sensors',
      problem: 'After surgery, the chemistry of the fluid draining from a patient can warn of complications early. That needs small pH sensors that are accurate, consistent from unit to unit and quick to calibrate.',
      approach: ['Designed and validated more than 50 pH and ISFET-based sensors to ISO 13485 quality requirements.', 'Led a Design of Experiments study on the calibration procedure.', 'Wrote Python filters that remove artifacts from real-time patient-monitoring signals, across more than 1,000 datasets.', 'Built automated calibration stations with custom PCBs, Arduino control and 3D-printed fixtures, and wrote five SOPs.'],
      result: 'Calibration time fell by 66%, saving about 20 engineer-hours a month, with 95% compliance on sensor quality checks.', next: '',
      stack: ['ISFET sensors', 'Design of Experiments', 'Python', 'PCB design', 'Arduino', 'ISO 13485'], fig: { tpl: 'tpl-isfet', cap: 'An ISFET pH sensor in cross-section' } },
    batteries: { kind: 'job', meta: [['Role', 'Research Assistant'], ['When', 'Feb – May 2023'], ['Where', 'Astana, Kazakhstan']], title: 'INSTITUTE OF BATTERIES', kicker: 'Experience · Battery materials',
      problem: 'A cathode material is only as good as the cells you can build from it. Improving cycle life means making cells, testing them, and tracing each result back to the material.',
      approach: ['Fabricated and tested more than 50 coin and pouch cells with LiFePO₄ and NCM cathodes.', 'Characterized cathodes and electrolytes by SEM, XRD, impedance spectroscopy and cyclic voltammetry.', 'Deposited electrode and interface films by magnetron sputtering, PECVD and electrospinning in an ISO 5–7 cleanroom.', 'Wrote three technical invention disclosures (150+ pages) on lithium and nickel extraction and NCM811 cathode doping, with a review of 100+ patents and papers.'],
      result: 'Doping strategies improved cycle life by 15%.', next: '',
      stack: ['Coin and pouch cells', 'SEM', 'XRD', 'EIS', 'Sputtering', 'PECVD'], fig: { tpl: 'tpl-coin', cap: 'Inside a coin cell' } },
    ttc: { kind: 'job', meta: [['Role', 'Access Control Administrator'], ['When', 'May – Aug 2022'], ['Where', 'Toronto, Ontario']], title: 'TORONTO TRANSIT COMMISSION', kicker: 'Experience · IT operations',
      problem: 'A large organization has to review regularly who has access to which systems. Done by hand across thousands of accounts, that review is slow and easy to get wrong.',
      approach: ['Automated the access-review reporting with Python and Excel VBA.', 'Covered accounts in Active Directory and on the IBM mainframe.'],
      result: 'Automated reviews for more than 5,000 accounts.', next: '',
      stack: ['Python', 'Excel VBA', 'Active Directory'], fig: { tpl: 'tpl-ttc', cap: 'From account lists to a review report' } },
    uoft: { kind: 'job', heads: ['The program', 'What I am working on', 'Timeline'], meta: [['Degree', 'Master of Engineering'], ['When', 'Sep 2026 – Aug 2027'], ['Where', 'Toronto, Ontario']], title: 'UNIVERSITY OF TORONTO', kicker: 'Education · Materials Science and Engineering',
      problem: 'A one-year, full-time Master of Engineering in Materials Science and Engineering. My courses and research sit where materials meet machine learning and the nervous system.',
      approach: ['Courses in deep learning, machine learning, biomaterials and neuromodulation.', 'Building InAs nanowire FET sensors in Prof. Harry Ruda\'s group, from fabrication to simulation.', 'Building an LLM agent that extracts magnetic-property data from papers, with Vahid Attari.', 'Comparing reinforcement and imitation learning on Atari Breakout, as a deep-learning team project.'],
      result: 'In progress. Expected completion in August 2027.', next: '',
      stack: ['PyTorch', 'Photolithography', 'Molecular dynamics', 'LangGraph'], fig: { tpl: 'tpl-uoft', cap: 'A sketch of the front campus' } },
    waterloo: { kind: 'job', heads: ['The program', 'What I did', 'Outcome'], meta: [['Degree', 'BASc, Nanotechnology Engineering'], ['When', '2021 – 2026'], ['Where', 'Waterloo, Ontario']], title: 'UNIVERSITY OF WATERLOO', kicker: 'Education · Nanotechnology Engineering, co-op',
      problem: 'A five-year co-op engineering degree that alternates study terms with full-time work terms. I took specializations in AI and cognitive systems, and in nano-biosystems.',
      approach: ['Worked four co-op terms: optics at Christie Digital, medical sensors at FluidAI, battery materials at the Institute of Batteries and IT at the TTC.', 'Led the capstone team on a self-healing dental composite.', 'Built a carbon-nanomaterial supercapacitor and a PDMS microfluidic reactor for gold nanoparticles in the fourth-year labs.', 'Wrote an independent paper on evolving artificial life in Lenia.', 'Wrote a Monte Carlo sputter-deposition simulator with Waterloo Hacker Fab, and compared shielding nanomaterials on the Waterloo Rocketry payload team.'],
      result: 'Degree conferred in October 2026.', next: '',
      stack: ['Cleanroom fabrication', 'Microfluidics', 'Python', 'Characterization'], fig: { tpl: 'tpl-uw', cap: 'A sketch of the nanotechnology building' } },
    lenia: { meta: [['Status', 'Done'], ['Role', 'Sole author'], ['Where', 'University of Waterloo']], title: 'EVOLVING ARTIFICIAL LIFE', kicker: '05 · Winter 2026 · Independent paper, University of Waterloo',
      problem: 'Can simple local rules be evolved to grow a target shape from noise? And does that shape then repair itself, as living tissue does?',
      approach: ['Wrote an FFT-accelerated Lenia simulation in Python.', 'Ran a (μ+λ) evolution strategy over a 7-dimensional space of kernel and growth parameters.', 'Scored target shapes with a composite fitness, then deleted parts of each organism to test self-repair.'],
      result: 'Fitness rose from a 0.28 random baseline to 0.72 for disks and 0.43–0.75 for rings within 60–80 generations. Shape-formation fitness alone did not produce self-repair.',
      next: '', stack: ['Python', 'NumPy FFT', 'Evolution strategies'], fig: { video: '#lenia-vid', cap: 'My simulation · rings forming from noise', extra: '#img-lenia-tl', extraCap: 'Time-lapse of the best evolved ring rule, from my report' } }
  };
  var sheet = document.getElementById('sheet'), sheetMain = document.getElementById('sheet-main'), sheetSide = document.getElementById('sheet-side'), sheetFrom = null;
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function part(parent, head, body) { var s = el('section'); s.appendChild(el('h3', '', head)); if (typeof body === 'string') s.appendChild(el('p', '', body)); else s.appendChild(body); parent.appendChild(s); }
  var SETS = { wires: [ { sel: '#img-sem', cap: 'SEM · released nanowires · 5 µm scale bar' }, { sel: '#img-pores', cap: 'SEM · the porous template they grow in · 2 µm scale bar' } ] };
  function buildSet(fig, key) {
    var items = SETS[key], stage = el('div', 'gstage'), cap = el('figcaption', '', items[0].cap), btn = el('button', 'gnext'), cur = 0, timer = null;
    btn.type = 'button';
    items.forEach(function (g, i) { var s = document.querySelector(g.sel), im = el('img', i ? '' : 'on'); im.src = s.src; im.alt = s.alt; stage.appendChild(im); });
    function show(k) {
      cur = (k + items.length) % items.length;
      Array.prototype.forEach.call(stage.children, function (im, i) { im.classList.toggle('on', i === cur); });
      cap.textContent = items[cur].cap; btn.textContent = (cur + 1) + ' / ' + items.length + ' →';
      fig.classList.remove('cut'); void fig.offsetWidth; fig.classList.add('cut');
    }
    btn.textContent = '1 / ' + items.length + ' →'; btn.setAttribute('aria-label', 'Next photo');
    btn.addEventListener('click', function () { show(cur + 1); clearInterval(timer); });
    fig.classList.add('gallery'); fig.appendChild(stage); fig.appendChild(btn); fig.appendChild(cap);
    if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      timer = setInterval(function () { if (!document.body.contains(fig)) { clearInterval(timer); return; } if (!fig.matches(':hover')) show(cur + 1); }, 4800);
    }
    return fig;
  }
  Array.prototype.forEach.call(document.querySelectorAll('figure[data-set]'), function (f) { buildSet(f, f.getAttribute('data-set')); });
  var sheetMeta = document.getElementById('sheet-meta'), sheetNow = null, ORDER = { 'case': ['fet', 'dbs', 'agent', 'wires', 'lenia'], job: ['uoft', 'christie', 'fluidai', 'batteries', 'ttc', 'waterloo'], note: ['sem', 'eis', 'xrd', 'dls'] };
  function fillMeta(c, stack) {
    sheetMeta.textContent = '';
    (c.meta || []).concat(stack ? [['Stack', stack.join(' ; ')]] : []).forEach(function (m) { var p = el('p'); p.appendChild(el('b', '', m[0])); p.appendChild(document.createTextNode(' : ' + m[1])); sheetMeta.appendChild(p); });
  }
  function showSheet(kind, id) {
    sheetNow = { kind: kind, id: id };
    sheet.hidden = false; sheet.scrollTop = 0; docEl.style.overflow = 'hidden';
    sheet.classList.remove('in', 'out'); void sheet.offsetWidth; sheet.classList.add('in');
    var ttl = document.getElementById('sheet-title'), full = ttl.textContent, step = 0;
    if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      var G = 'ABCDEFGHIKLMNOPRSTUVXZ', iv = setInterval(function () {
        step += 2; var out = '';
        for (var i = 0; i < full.length; i++) out += (i < step || !/[A-Za-z]/.test(full[i])) ? full[i] : G[Math.floor(Math.random() * G.length)];
        ttl.textContent = out; if (step >= full.length) { clearInterval(iv); ttl.textContent = full; }
      }, 24);
    }
    document.getElementById('sheet-close').focus();
  }
  function stepSheet(d) {
    if (!sheetNow) return; var list = ORDER[sheetNow.kind], k = (list.indexOf(sheetNow.id) + d + list.length) % list.length, kind = sheetNow.kind;
    sheet.classList.add('out');
    setTimeout(function () { if (kind === 'note') openNote(list[k]); else openCase(list[k]); }, 210);
  }
  document.getElementById('sheet-prev').addEventListener('click', function () { stepSheet(-1); });
  document.getElementById('sheet-next').addEventListener('click', function () { stepSheet(1); });
  document.addEventListener('keydown', function (e) { if (sheet.hidden) return; if (e.key === 'ArrowRight') stepSheet(1); if (e.key === 'ArrowLeft') stepSheet(-1); });
  function openCase(id) {
    var c = CASES[id]; if (!c) return;
    document.getElementById('sheet-title').textContent = c.title; document.getElementById('sheet-kicker').textContent = c.kicker;
    sheetMain.textContent = ''; sheetSide.textContent = '';
    var hd = c.heads || ['The problem', 'What I did', 'Result'];
    part(sheetMain, hd[0], c.problem);
    var ol = el('ol'); c.approach.forEach(function (a) { ol.appendChild(el('li', '', a)); }); part(sheetMain, hd[1], ol);
    part(sheetMain, hd[2], c.result);
    if (c.next) part(sheetMain, 'Next', c.next);
    var fig = el('figure', 'photo' + (c.fig.chart ? ' chart' : '') + (c.fig.set ? ' poly' : ''));
    if (c.fig.set) { buildSet(fig, c.fig.set); }
    else if (c.fig.chart) { var s = document.createElementNS(SVGNS, 'svg'); s.setAttribute('class', 'pic plot'); s.setAttribute('id', 'sheet-chart'); s.setAttribute('viewBox', '0 0 300 225'); s.setAttribute('role', 'img'); s.setAttribute('aria-label', dbsChart.getAttribute('aria-label')); fig.appendChild(s); drawChart(s, freqIdx); }
    else if (c.fig.img) { var im = el('img', 'pic'); im.src = document.querySelector(c.fig.img).src; im.alt = document.querySelector(c.fig.img).alt; fig.appendChild(im); }
    else if (c.fig.video) { var sv0 = document.querySelector(c.fig.video), vd = el('video', 'pic sq'); vd.src = sv0.getAttribute('src'); vd.poster = sv0.getAttribute('poster'); vd.muted = true; vd.loop = true; vd.playsInline = true; vd.setAttribute('aria-label', sv0.getAttribute('aria-label')); if (reduce) vd.controls = true; else vd.autoplay = true; fig.appendChild(vd); }
    else if (c.fig.tpl) { fig.className = 'photo chart'; fig.appendChild(document.getElementById(c.fig.tpl).content.cloneNode(true)); }
    else { var sl = el('div', 'pic slot'); sl.appendChild(document.createTextNode('Photo slot')); sl.appendChild(el('br')); sl.appendChild(document.createTextNode(c.fig.slot)); fig.appendChild(sl); }
    if (!c.fig.set) fig.appendChild(el('figcaption', '', c.fig.cap)); fig.style.setProperty('--rot', '0deg'); sheetSide.appendChild(fig);
    if (c.fig.extra) { var f2 = el('figure', 'photo chart wide'), i2 = el('img', 'pic free'), s2 = document.querySelector(c.fig.extra); i2.src = s2.src; i2.alt = s2.alt; f2.appendChild(i2); f2.appendChild(el('figcaption', '', c.fig.extraCap)); f2.style.setProperty('--rot', '0deg'); sheetMain.appendChild(f2); }
    fillMeta(c, c.stack); showSheet(c.kind || 'case', id);
  }
  function closeCase() { if (sheet.hidden) return; sheet.hidden = true; sheetNow = null; sheet.classList.remove('in', 'out'); docEl.style.overflow = ''; if (sheetFrom) sheetFrom.focus(); }
  var NOTES = {
    sem: { meta: [['Filed', 'Characterization'], ['Used in', 'Metal nanowires ; microcapsules ; battery cathodes']], title: 'HOW A SCANNING ELECTRON MICROSCOPE WORKS', kicker: 'Field note 01 · Characterization',
      main: [
        { h: 'In one paragraph', p: 'An SEM does not take a picture the way a camera does. It focuses a beam of electrons to a spot a few nanometres wide, sweeps that spot across the sample line by line in vacuum, and at each position counts the electrons that come back off the surface. Each count becomes the brightness of one pixel. Magnification is just the ratio between the screen and the area scanned, and resolution is set by the size of the spot and how far the electrons spread inside the sample, not by the wavelength of light.' },
        { h: 'Three signals, three kinds of information', list: [
          'Secondary electrons (SE) are knocked out of the sample with energies below about 50 eV. They only escape from the top few nanometres, so they show surface shape.',
          'Backscattered electrons (BSE) are beam electrons that bounce back out. Heavier atoms scatter more of them, so brightness follows atomic number and shows composition.',
          'Characteristic X-rays, read by an EDS detector, identify which elements are present.' ] },
        { h: 'Settings that matter', list: [
          'Accelerating voltage. Higher voltage gives a finer spot but pushes the beam deeper, which blurs surface detail and charges insulators. Lower voltage keeps the view close to the surface.',
          'Working distance. A shorter distance between lens and sample improves resolution and costs depth of field.',
          'Detector. SE for shape, BSE for composition.' ] },
        { h: 'Where it misleads you', list: [
          'Charging. Insulators build up charge and show bright patches, streaks or drift. A thin conductive coating or a lower voltage fixes it.',
          'Edges look bright because more secondary electrons escape there. That is geometry, not composition.',
          'The image is a projection. A tilted wire looks shorter than it is.',
          'The beam can damage polymers and deposit contamination while you watch.',
          'EDS is not nanometre-sharp. Its X-rays come from the whole interaction volume.' ] },
        { h: 'Where I used it', p: 'Metal nanowires: backscatter mode at 30 kV, 6,000×, 9.4 mm working distance. Backscatter suits a wire made of different metals, because gold (Z = 79) should appear brighter than silver (47), palladium (46) and nickel (28). The porous template the wires grow in: secondary-electron mode at 5 kV, 20,000×, where a low voltage keeps the view on the surface and limits charging. I have also used SEM on polymer microcapsules and battery cathodes.',
          imgs: [ { sel: '#img-sem', cap: 'Released nanowires · BSE · 30 kV · 5 µm scale bar' }, { sel: '#img-pores', cap: 'Template pores · SE · 5 kV · 2 µm scale bar' } ] }
      ],
      side: [ { tpl: 'tpl-sem-column', cap: 'The column: gun to sample' }, { tpl: 'tpl-sem-volume', cap: 'Where each signal comes from' } ] },
    eis: { meta: [['Filed', 'Electrochemistry'], ['Used in', 'Carbon supercapacitor ; battery cells']], title: 'READING A CELL WITH IMPEDANCE AND CYCLIC VOLTAMMETRY', kicker: 'Field note 02 · Electrochemistry',
      main: [
        { h: 'In one paragraph', p: 'Two measurements answer most first questions about a battery or supercapacitor. Cyclic voltammetry (CV) sweeps the voltage up and down at a fixed rate and records the current, which shows how much charge the cell stores and whether it stores it like a capacitor or through a chemical reaction. Electrochemical impedance spectroscopy (EIS) applies a tiny AC voltage at one frequency after another and records how the current responds, which separates the sources of resistance by how fast each one acts.' },
        { h: 'Reading a CV curve', list: [
          'A box-like curve means capacitive storage: the current is proportional to the sweep rate.',
          'Peaks mean a redox reaction at a particular voltage, as in a battery electrode.',
          'The area enclosed gives the stored charge, and from it the capacitance.',
          'A curve that tilts or narrows at faster sweep rates points to resistance limiting the cell.' ] },
        { h: 'Reading a Nyquist plot', list: [
          'Each point is one frequency, with high frequencies on the left and low on the right.',
          'Where the curve first meets the horizontal axis is the series resistance (ESR): electrolyte, contacts and leads.',
          'A semicircle is charge transfer in parallel with the double-layer capacitance. Its width is the charge-transfer resistance.',
          'A 45° line means ions are diffusing, in the electrolyte or into pores.',
          'A near-vertical line at low frequency is capacitor-like behaviour.' ] },
        { h: 'Where it misleads you', list: [
          'An equivalent circuit is a model, not a measurement. Several different circuits can fit the same plot.',
          'Two-electrode and three-electrode cells report different things: the whole device, or one electrode.',
          'Capacitance depends on how it was measured. Quote the sweep rate or current, and whether the value is per electrode or per cell.',
          'EIS assumes the cell is stable and responds linearly. A drifting cell or a large signal breaks that.' ] },
        { h: 'Where I used it', p: 'Carbon supercapacitor (NE 455D): activated carbon and multi-walled nanotube electrodes in coin cells with 1 M KOH. CV and galvanostatic cycling gave about 92 F/g per electrode. EIS gave a series resistance of 1.4 Ω and a much larger resistance of about 120 Ω, which I attributed to ions moving through the micropores and which limited how fast the cell could charge. I also ran EIS and CV on LiFePO₄ and NCM cells at the Institute of Batteries.' }
      ],
      side: [ { tpl: 'tpl-eis', cap: 'Top: Nyquist plot from EIS. Bottom: CV shapes.' } ] },
    xrd: { meta: [['Filed', 'Characterization'], ['Used in', 'Battery cathodes']], title: 'WHAT AN X-RAY DIFFRACTION PATTERN TELLS YOU', kicker: 'Field note 03 · Characterization',
      main: [
        { h: 'In one paragraph', p: 'A crystal is a stack of evenly spaced planes of atoms. X-rays have a wavelength close to that spacing, so waves reflecting off neighbouring planes reinforce each other only at particular angles. An XRD scan sweeps the angle and records the intensity. The positions of the peaks give the spacings between planes, and that set of spacings is a fingerprint of the crystal structure.' },
        { h: 'The one equation', p: 'Bragg’s law, nλ = 2d sin θ. A peak appears when the extra distance travelled by the ray reflecting off the lower plane is a whole number of wavelengths.' },
        { h: 'What each feature of a peak means', list: [
          'Position: the plane spacing, so which phase is present and the size of its lattice. A shift means the lattice has stretched or shrunk.',
          'Width: narrow peaks mean large, well-ordered crystals. Broad peaks mean small crystallites or strain.',
          'Relative height: how atoms are arranged in the unit cell, and whether the grains favour one orientation.',
          'A broad hump with no sharp peaks: amorphous material.' ] },
        { h: 'Where it misleads you', list: [
          'It only sees what is crystalline. Amorphous phases, and phases below a few percent, can be missed.',
          'A sample mounted slightly too high or too low shifts every peak.',
          'Flat or needle-shaped grains line up when you pack the powder, which distorts the peak heights.',
          'Peak broadening has several causes at once: crystallite size, strain and the instrument itself.' ] },
        { h: 'Where I used it', p: 'Battery cathodes at the Institute of Batteries: checking the crystal phase of LiFePO₄ and NCM materials, alongside SEM for particle shape and electrochemical tests for performance.' }
      ],
      side: [ { tpl: 'tpl-xrd', cap: 'Top: Bragg reflection from two planes. Bottom: what peak width shows.' } ] },
    dls: { meta: [['Filed', 'Characterization'], ['Used in', 'Gold nanoparticle synthesis']], title: 'SIZING NANOPARTICLES WITH LIGHT: DLS AND UV–VIS', kicker: 'Field note 04 · Characterization',
      main: [
        { h: 'In one paragraph', p: 'Particles in a liquid never sit still. Dynamic light scattering (DLS) shines a laser through the liquid and watches how quickly the scattered light flickers: small particles move fast and flicker fast, large ones drift and flicker slowly. The flicker rate gives how fast the particles diffuse, and from that their size. UV–Vis spectroscopy is simpler. It measures how much light of each colour the sample absorbs.' },
        { h: 'How DLS gets a size', list: [
          'The detector records intensity over time, and a correlator measures how quickly that signal stops resembling itself.',
          'That decay rate gives the diffusion coefficient D.',
          'The Stokes–Einstein relation, d = kT / (3πηD), turns D into a diameter, using the temperature and the viscosity of the liquid.' ] },
        { h: 'What UV–Vis adds for gold', list: [
          'Gold nanoparticles absorb strongly near 520 nm, because the light drives their electrons to oscillate together (a surface plasmon).',
          'Larger particles shift the peak toward red and broaden it. Clumping shifts it further.',
          'The height of the peak follows concentration (the Beer–Lambert law).' ] },
        { h: 'Where it misleads you', list: [
          'DLS measures the particle plus the layer of liquid and molecules it drags along, so it reads larger than electron microscopy.',
          'Scattering rises with the sixth power of diameter. A few large particles or specks of dust can swamp the signal from many small ones.',
          'It assumes spheres and a dilute sample.',
          'A UV–Vis peak alone cannot tell a broad range of sizes from mild clumping.' ] },
        { h: 'Where I used it', p: 'Gold nanoparticles (NE 454C): I made particles in a PDMS microfluidic reactor and by the Frens citrate method, then compared them. The Frens batches measured 33–50 nm by DLS, with plasmon peaks at 529–553 nm, which fits particles in that size range.' }
      ],
      side: [ { tpl: 'tpl-dls', cap: 'Top: the DLS set-up. Middle: flicker by size. Bottom: gold’s plasmon peak.' } ] }
  };
  function openNote(id) {
    var c = NOTES[id]; if (!c) return;
    document.getElementById('sheet-title').textContent = c.title; document.getElementById('sheet-kicker').textContent = c.kicker;
    sheetMain.textContent = ''; sheetSide.textContent = '';
    c.main.forEach(function (m) {
      var body = el('div'); body.style.display = 'grid'; body.style.gap = '12px';
      if (m.p) body.appendChild(el('p', '', m.p));
      if (m.list) { var ol = el('ol'); m.list.forEach(function (a) { ol.appendChild(el('li', '', a)); }); body.appendChild(ol); }
      if (m.imgs) { var fg = el('div', 'figs'); m.imgs.forEach(function (g) { var f = el('figure', 'photo chart'), src = document.querySelector(g.sel), im = el('img', 'pic'); im.src = src.src; im.alt = src.alt; f.appendChild(im); f.appendChild(el('figcaption', '', g.cap)); f.style.setProperty('--rot', '0deg'); fg.appendChild(f); }); body.appendChild(fg); }
      part(sheetMain, m.h, body);
    });
    c.side.forEach(function (sd) { var f = el('figure', 'photo chart'); f.appendChild(document.getElementById(sd.tpl).content.cloneNode(true)); f.appendChild(el('figcaption', '', sd.cap)); f.style.setProperty('--rot', '0deg'); sheetSide.appendChild(f); });
    fillMeta(c, null); showSheet('note', id);
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-note]:not(.tile)'), function (b) { b.addEventListener('click', function () { sheetFrom = b; openNote(b.getAttribute('data-note')); }); });

  var tl = document.getElementById('timeline');
  if (window.IntersectionObserver && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    tl.classList.add('anim');
    new IntersectionObserver(function (es, ob) { es.forEach(function (e) { if (e.isIntersecting) { tl.classList.add('in'); ob.disconnect(); } }); }, { threshold: 0.15 }).observe(tl);
  }
  var folder = document.getElementById('archive'), folderTab = folder.querySelector('.folder-tab'), folderBody = document.getElementById('archive-body');
  folderTab.addEventListener('click', function () { var o = folder.classList.toggle('open'); folderTab.setAttribute('aria-expanded', o); folderBody.setAttribute('aria-hidden', !o); });

  /* contact: copy email, close the popover when clicking away */
  var pop = document.getElementById('contact-pop'), copyBtn = document.getElementById('copy-mail');
  copyBtn.addEventListener('click', function () {
    var txt = document.getElementById('mail').textContent;
    function done(ok) { copyBtn.textContent = ok ? 'Copied' : 'Select the address above to copy'; setTimeout(function () { copyBtn.textContent = 'Copy email'; }, 2200); }
    try { navigator.clipboard.writeText(txt).then(function () { done(true); }, function () { done(false); }); } catch (e) { done(false); }
  });
  document.addEventListener('click', function (e) { if (pop.open && !pop.contains(e.target)) pop.open = false; });

  /* text scramble on hover for nav links and bracket buttons */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, GL = 'ABCDEFGHIKLMNOPRSTUVXZ0123456789';
  if (!reduceMotion && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
    Array.prototype.forEach.call(document.querySelectorAll('.bar nav > a, .brk, .rail a span'), function (n) {
      if (n.children.length) return;
      var orig = n.textContent, timer = null;
      var host = n.closest('.rail a') || n;
      host.addEventListener('pointerenter', function () {
        if (n.id === 'copy-mail') return;
        var step = 0; clearInterval(timer);
        timer = setInterval(function () {
          step++; var out = '';
          for (var i = 0; i < orig.length; i++) { var ch = orig[i]; out += (i < step || !/[A-Za-z0-9]/.test(ch)) ? ch : GL[Math.floor(Math.random() * GL.length)]; }
          n.textContent = out; if (step >= orig.length) { clearInterval(timer); n.textContent = orig; }
        }, 22);
      });
      host.addEventListener('pointerleave', function () { clearInterval(timer); n.textContent = orig; });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-case]'), function (b) { b.addEventListener('click', function () { sheetFrom = b; openCase(b.getAttribute('data-case')); }); });
  document.getElementById('sheet-close').addEventListener('click', closeCase);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCase(); });

  /* lighter build for phones and low-power devices; short loading sequence */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lite = window.innerWidth < 700 || (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  var N = lite ? 6000 : 12000;
  document.getElementById('hud-n').textContent = (N === 6000 ? '6 000' : '12 000') + ' PARTICLES';
  /* ---------- skills: readout, pin, filters, link to the 3D scenes ---------- */
  var table = document.getElementById('table'), ro = document.getElementById('readout'), tiles = Array.prototype.slice.call(table.querySelectorAll('.tile')), pinned = null;
  var FAMN = { fab: 'Fabrication', chr: 'Characterization', mlx: 'ML and signals', sim: 'Simulation' };
  var CASEN = { fet: 'Nanowire FET', dbs: 'DBS recordings', agent: 'Materials agent', wires: 'Metal nanowires', lenia: 'Artificial life', batteries: 'Institute of Batteries', christie: 'Christie Digital', fluidai: 'FluidAI Medical' };
  var NOTEN = { sem: 'SEM explainer', eis: 'EIS and CV explainer', dls: 'DLS explainer' };
  var SHAPE_OF = { fet: 1, dbs: 2, agent: 3, wires: 4, lenia: 5 };
  window.skillShape = 0;
  function famOf(t) { return ['fab', 'chr', 'mlx', 'sim'].filter(function (f) { return t.classList.contains(f); })[0]; }
  function goTarget(g) {
    var k = g.split(':');
    if (k[0] === 'case') { sheetFrom = ro; openCase(k[1]); }
    else if (k[0] === 'note') { sheetFrom = ro; openNote(k[1]); }
    else if (k[0] === 'bench') document.getElementById('bench').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }
  function showTile(t) {
    tiles.forEach(function (x) { x.classList.toggle('on', x === t); });
    table.classList.toggle('focus', !!t);
    var sym = ro.querySelector('.rsym'), nm = ro.querySelector('.rname'), fm = ro.querySelector('.rfam'), us = ro.querySelector('.rused');
    us.textContent = '';
    if (!t) { ro.className = 'idle'; ro.style.removeProperty('--fam'); sym.textContent = '?'; nm.textContent = 'Pick an element'; fm.textContent = 'Hover or tap a tile to see where it was used. Click it to keep it selected, then open the project.'; window.skillShape = 0; return; }
    ro.className = ''; ro.style.setProperty('--fam', getComputedStyle(t).getPropertyValue('--fam'));
    sym.textContent = t.querySelector('.sym').textContent; nm.textContent = t.querySelector('.nm').textContent.replace(/ · note$/, '');
    fm.textContent = FAMN[famOf(t)] + ' · ' + t.getAttribute('data-used');
    var go = (t.getAttribute('data-go') || '').split('|').filter(Boolean), first = 0;
    go.forEach(function (g) {
      var k = g.split(':'), label = k[0] === 'case' ? CASEN[k[1]] : k[0] === 'note' ? NOTEN[k[1]] : 'See the chip below';
      var b = el('button', '', label); b.type = 'button'; b.addEventListener('click', function () { goTarget(g); }); us.appendChild(b);
      if (!first && k[0] === 'case' && SHAPE_OF[k[1]]) first = SHAPE_OF[k[1]];
    });
    if (!go.length) us.appendChild(el('span', '', 'Coursework and labs'));
    window.skillShape = first;
  }
  tiles.forEach(function (t, i) {
    t.style.setProperty('--d', (i * 0.035).toFixed(3) + 's'); t.setAttribute('aria-pressed', 'false');
    t.addEventListener('pointerenter', function () { showTile(t); });
    t.addEventListener('focus', function () { showTile(t); });
    t.addEventListener('click', function (e) {
      if (t.hasAttribute('data-note')) e.stopImmediatePropagation();
      var same = pinned === t; if (pinned) pinned.setAttribute('aria-pressed', 'false');
      pinned = same ? null : t; if (pinned) pinned.setAttribute('aria-pressed', 'true');
      showTile(pinned || t);
    });
  });
  table.addEventListener('pointerleave', function () { showTile(pinned); });
  var famBtns = Array.prototype.slice.call(document.querySelectorAll('#fams button'));
  famBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-fam'), on = table.getAttribute('data-filter') === f;
      famBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(!on && x === b)); });
      if (on) table.removeAttribute('data-filter'); else table.setAttribute('data-filter', f);
      tiles.forEach(function (t) { t.classList.toggle('hit', !on && t.classList.contains(f)); });
    });
  });

  /* ---------- bench slider ---------- */
  var cmp = document.getElementById('compare'), cmpIn = cmp.querySelector('input'), swept = false;
  function setCut(v) { cmp.style.setProperty('--cut', v + '%'); cmpIn.value = v; }
  cmpIn.addEventListener('input', function () { swept = true; setCut(+cmpIn.value); });
  if (window.IntersectionObserver && !reduce) {
    new IntersectionObserver(function (es, ob) { es.forEach(function (e) {
      if (!e.isIntersecting) return; ob.disconnect(); var t0 = null;
      (function step(now) { if (swept) return; if (t0 === null) t0 = now; var u = Math.min(1, (now - t0) / 2200), v = 50 + 38 * Math.sin(u * Math.PI * 2) * (1 - u); setCut(v.toFixed(1)); if (u < 1) requestAnimationFrame(step); })(performance.now());
    }); }, { threshold: 0.6 }).observe(cmp);
  }

  /* ---------- copy email ---------- */
  var cpy = document.getElementById('copy-mail');
  cpy.addEventListener('click', function () {
    var m = 'alikhanseisembekov1@gmail.com';
    function done() { cpy.textContent = '[ Copied ]'; cpy.classList.add('ok'); setTimeout(function () { cpy.textContent = '[ Copy email ]'; cpy.classList.remove('ok'); }, 1800); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(m).then(done, function () { window.location.href = 'mailto:' + m; });
    else window.location.href = 'mailto:' + m;
  });

  /* ---------- reveal: tiles stagger in, headings scramble once ---------- */
  if (window.IntersectionObserver && !reduce) {
    table.classList.add('anim');
    new IntersectionObserver(function (es, ob) { es.forEach(function (e) { if (e.isIntersecting) { table.classList.add('in'); ob.disconnect(); setTimeout(function () { table.classList.remove('anim', 'in'); }, 1400); } }); }, { threshold: 0.2 }).observe(table);
    var G2 = 'ABCDEFGHIKLMNOPRSTUVXZ';
    var hob = new IntersectionObserver(function (es) { es.forEach(function (e) {
      if (!e.isIntersecting) return; hob.unobserve(e.target);
      var h = e.target, full = h.textContent, step = 0, iv = setInterval(function () {
        step += 1; var out = '';
        for (var i = 0; i < full.length; i++) out += (i < step || !/[A-Za-z]/.test(full[i])) ? full[i] : G2[Math.floor(Math.random() * G2.length)];
        h.textContent = out; if (step >= full.length) { clearInterval(iv); h.textContent = full; }
      }, 28);
    }); }, { threshold: 0.6 });
    Array.prototype.forEach.call(document.querySelectorAll('.screen > h2'), function (h) { hob.observe(h); });
  }

  Array.prototype.forEach.call(document.querySelectorAll('.photo'), function (f) {
    f.addEventListener('pointermove', function (e) {
      var r = f.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      f.style.setProperty('--mx', (x * 100).toFixed(1) + '%'); f.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      f.style.setProperty('--ty', ((x - 0.5) * 16).toFixed(1) + 'deg'); f.style.setProperty('--tx', ((0.5 - y) * 16).toFixed(1) + 'deg');
    });
    f.addEventListener('pointerleave', function () { f.style.setProperty('--tx', '0deg'); f.style.setProperty('--ty', '0deg'); });
  });

  if (reduce) { var lv = document.getElementById('lenia-vid'); lv.removeAttribute('autoplay'); lv.pause(); lv.controls = true; }
  if (!window.THREE) { docEl.classList.add('no3d'); return; }
  var canvas = document.getElementById('stage'), renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !lite, alpha: false }); } catch (e) { docEl.classList.add('no3d'); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.autoClear = false;

  /* ---------- background: litmus paper, contour lines, grain ---------- */
  var bgScene = new THREE.Scene(), bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var bgMat = new THREE.ShaderMaterial({
    depthTest: false, depthWrite: false, extensions: { derivatives: true },
    uniforms: { uTime: { value: 0 }, uP: { value: 0 }, uAspect: { value: 1 }, uMouse: { value: new THREE.Vector2(0.5, 0.5) }, uObj: { value: new THREE.Vector2(0.5, 0.5) } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: [
      'precision highp float; varying vec2 vUv; uniform float uTime, uP, uAspect; uniform vec2 uMouse, uObj;',
      'vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }',
      'float snoise(vec2 v){ const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);',
      ' vec2 i = floor(v + dot(v, C.yy)); vec2 x0 = v - i + dot(i, C.xx); vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);',
      ' vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod(i, 289.0);',
      ' vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));',
      ' vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0); m = m*m; m = m*m;',
      ' vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox;',
      ' m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);',
      ' vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw; return 130.0 * dot(m, g); }',
      'float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }',
      'vec3 washAt(float p){',
      ' vec3 w = vec3(0.780, 0.770, 0.880);',
      ' w = mix(w, vec3(0.905, 0.760, 0.775), smoothstep(0.0, 1.0, p));',
      ' w = mix(w, vec3(0.690, 0.830, 0.835), smoothstep(1.0, 2.0, p));',
      ' w = mix(w, vec3(0.870, 0.810, 0.640), smoothstep(2.0, 3.0, p));',
      ' w = mix(w, vec3(0.760, 0.800, 0.900), smoothstep(3.0, 4.0, p));',
      ' w = mix(w, vec3(0.720, 0.850, 0.760), smoothstep(4.0, 5.0, p));',
      ' w = mix(w, vec3(0.760, 0.790, 0.880), smoothstep(5.0, 6.0, p));',
      ' w = mix(w, vec3(0.870, 0.800, 0.720), smoothstep(6.0, 7.0, p));',
      ' w = mix(w, vec3(0.800, 0.775, 0.870), smoothstep(7.0, 8.0, p)); return w; }',
      'void main(){',
      ' vec2 uv = vUv; vec2 q = vec2(uv.x * uAspect, uv.y);',
      ' float n = snoise(q * 1.1 + vec2(uTime * 0.02, -uTime * 0.015));',
      ' float n2 = snoise(q * 2.3 - vec2(uTime * 0.012, uTime * 0.02));',
      ' vec2 o = vec2(uObj.x * uAspect, uObj.y); float dObj = distance(q, o);',
      ' vec2 mq = vec2(uMouse.x * uAspect, uMouse.y); float dM = distance(q, mq);',
      ' float calm = 1.0 - 0.75 * smoothstep(5.2, 6.0, uP);',
      ' float field = q.y * 2.2 + n * 0.55 + n2 * 0.12 + calm * 0.5 * exp(-dObj * dObj * 5.0) + 0.16 * exp(-dM * dM * 14.0);',
      ' float f = field * 13.0; float d = abs(fract(f) - 0.5); float line = 1.0 - smoothstep(0.0, fwidth(f) * 1.2, d);',
      ' vec3 paper = vec3(0.922, 0.902, 0.855);',
      ' float g = smoothstep(-0.5, 0.9, n * 0.7 + (uv.x - 0.35) * 0.9 + (uv.y - 0.5) * 0.6);',
      ' vec3 col = mix(paper, washAt(uP), g);',
      ' vec3 ink = mix(vec3(0.55, 0.42, 0.20), vec3(0.14, 0.12, 0.26), g);',
      ' col = mix(col, ink, line * (0.20 + 0.25 * g) * (0.45 + 0.55 * calm));',
      ' col += (hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) * 0.055;',
      ' gl_FragColor = vec4(col, 1.0); }'
    ].join('\n')
  });
  bgScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat));

  /* ---------- particle shapes ---------- */
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function rr(a, b) { return a + (b - a) * rnd(); }
  function hex(h) { var c = new THREE.Color(h); return [c.r, c.g, c.b]; }
  var INK = hex('#231f3d'), SLATE = hex('#7d7a9c'), OXIDE = hex('#9a8fb5'), GOLD = hex('#a8771a'), WIRE = hex('#0b6d76'), ROSE = hex('#b8456a'),
      TEAL = hex('#0e7c7b'), SOFT = hex('#4a4568'), SILVER = hex('#8b95a6'), PALL = hex('#6a5aa8'), NICK = hex('#3f7f66'), VIO = hex('#5b4a9c'), PLUM = hex('#6b3fa0');
  var RCOL = [ROSE, PLUM, TEAL, GOLD];
  function shape(fill) {
    var s = { pos: new Float32Array(N * 3), col: new Float32Array(N * 3), aux: new Float32Array(N * 3), foil: new Float32Array(N) };
    for (var i = 0; i < N; i++) {
      var o = fill(i, i / N);
      s.pos.set(o.p, i * 3); s.col.set(o.c, i * 3); s.aux.set(o.a || [0, 0, 0], i * 3); s.foil[i] = o.f === undefined ? 0.1 : o.f;
    }
    return s;
  }
  function onSphere(c, r) { var t = rr(0, 6.2832), p = Math.acos(rr(-1, 1)); return [c[0] + r * Math.sin(p) * Math.cos(t), c[1] + r * Math.sin(p) * Math.sin(t), c[2] + r * Math.cos(p)]; }

  var somas = [[-1.35, 0.35, 0.2], [1.25, 0.6, -0.3], [-0.85, -0.95, 0.4], [0.95, -0.85, 0.2], [0.1, -1.4, -0.4]], types = [0, 2, 1, 3, 0], tip = [0, 0.25, 0], branches = [];
  somas.forEach(function (s, k) {
    for (var b = 0; b < 6; b++) {
      var dir = b === 0 ? [tip[0] - s[0], tip[1] - s[1], tip[2] - s[2]] : [rr(-1, 1), rr(-1, 1), rr(-1, 1)];
      var len = Math.hypot(dir[0], dir[1], dir[2]) || 1; dir = [dir[0] / len, dir[1] / len, dir[2] / len];
      var pts = [], p = s.slice(), steps = b === 0 ? Math.floor(len / 0.04 * 0.82) : 34;
      for (var j = 0; j < steps; j++) {
        if (b !== 0) { dir[0] += rr(-0.28, 0.28); dir[1] += rr(-0.28, 0.28); dir[2] += rr(-0.28, 0.28); var l = Math.hypot(dir[0], dir[1], dir[2]); dir = [dir[0] / l, dir[1] / l, dir[2] / l]; }
        p = [p[0] + dir[0] * 0.04, p[1] + dir[1] * 0.04, p[2] + dir[2] * 0.04]; pts.push(p);
      }
      branches.push({ k: k, pts: pts });
    }
  });

  var nodes = [[-0.55, 0, 0], [0.35, 0, 0], [1.25, 0, 0], [2.1, 0, 0]];
  var segs = [[8, SILVER], [3, PALL], [1, GOLD], [1, NICK], [2, SILVER], [1, GOLD], [1, NICK], [2, PALL]];
  function metalAt(fr) { var acc = 0; for (var k = 0; k < segs.length; k++) { acc += segs[k][0] / 19; if (fr <= acc) return segs[k][1]; } return PALL; }
  var smallWires = [];
  for (var w = 0; w < 6; w++) smallWires.push({ c: [rr(-1.8, 1.8), rr(-1.3, 0.75), rr(-1.4, -0.4)], ang: rr(-0.9, 0.9), tilt: rr(-0.4, 0.4), len: rr(1.6, 2.4) });

  var shapes = [
    /* 0 cloud */
    shape(function () {
      var rad = 1.55 * Math.pow(rnd(), 0.45), p = onSphere([0, 0, 0], rad); p[1] *= 0.85;
      return { p: p, c: rnd() < 0.12 ? GOLD : (rnd() < 0.5 ? INK : SOFT), a: [6, 0, 0], f: rnd() < 0.3 ? 0.7 : 0.15 };
    }),
    /* 1 nanowire FET */
    shape(function (i, u) {
      if (u < 0.30) { var top = rnd() < 0.7; return { p: [rr(-2.1, 2.1), top ? -0.46 : rr(-0.7, -0.46), top ? rr(-1.05, 1.05) : (rnd() < 0.5 ? 1.05 : rr(-1.05, 1.05))], c: top ? OXIDE : SLATE, f: 0.08 }; }
      if (u < 0.62) {
        var side = rnd() < 0.5 ? -1 : 1, face = rnd(), x = side * rr(0.72, 1.62), y = rr(-0.46, -0.16), z = rr(-0.55, 0.55);
        if (face < 0.5) y = -0.16; else if (face < 0.75) z = z < 0 ? -0.55 : 0.55; else x = side * (rnd() < 0.5 ? 0.72 : 1.62);
        return { p: [x, y, z], c: GOLD, f: 0.6 };
      }
      if (u < 0.78) { var a = rr(0, 6.2832); return { p: [rr(-1.0, 1.0), -0.38 + Math.sin(a) * 0.07, Math.cos(a) * 0.07], c: WIRE, f: 0.8 }; }
      return { p: [rr(-0.62, 0.62), -0.2 + Math.pow(rnd(), 1.6) * 1.25, rr(-0.5, 0.5)], c: ROSE, a: [1, 0, 0], f: 0.2 };
    }),
    /* 2 electrode + neurons */
    shape(function (i, u) {
      if (u < 0.10) { var a = rr(0, 6.2832), y = rr(0.25, 2.3), r = y < 0.5 ? 0.055 * (y - 0.25) / 0.25 : 0.055; return { p: [Math.cos(a) * r, y, Math.sin(a) * r], c: INK, a: [3, 0, 0], f: 0.6 }; }
      if (u < 0.45) { var k = Math.floor(rnd() * 5); return { p: onSphere(somas[k], 0.2 * (0.85 + 0.15 * rnd())), c: RCOL[types[k]], a: [2, k, types[k]], f: 0.25 }; }
      var br = branches[Math.floor(rnd() * branches.length)], pt = br.pts[Math.floor(rnd() * br.pts.length)];
      return { p: [pt[0] + rr(-0.012, 0.012), pt[1] + rr(-0.012, 0.012), pt[2] + rr(-0.012, 0.012)], c: RCOL[types[br.k]], a: [2, br.k, types[br.k]], f: 0.1 };
    }),
    /* 3 agent: pages -> node graph with a validator loop */
    shape(function (i, u) {
      if (u < 0.30) {
        var pg = Math.floor(rnd() * 3), ox = -2.15 + pg * 0.13, oy = -0.1 + pg * 0.1, oz = -pg * 0.18, e = rnd();
        if (e < 0.4) { var s = Math.floor(rnd() * 4), t = rnd(); var x = s === 0 ? 0 : s === 1 ? 0.62 : t * 0.62, y = s === 2 ? 0 : s === 3 ? 0.84 : t * 0.84; return { p: [ox + x, oy + y - 0.4, oz], c: INK, f: 0.3 }; }
        var row = Math.floor(rnd() * 8); return { p: [ox + 0.07 + rnd() * (row % 3 === 2 ? 0.3 : 0.48), oy + 0.74 - row * 0.09 - 0.4, oz], c: SLATE, f: 0.1 };
      }
      if (u < 0.62) { var k = Math.floor(rnd() * 4), val = k === 2; return { p: onSphere(nodes[k], 0.2 * (0.9 + 0.1 * rnd())), c: val ? ROSE : VIO, a: [4, k * 1.3, 0], f: 0.75 }; }
      if (u < 0.86) {
        var e2 = Math.floor(rnd() * 4), t2 = rnd(), x0 = e2 === 0 ? -1.45 : nodes[e2 - 1][0] + 0.2, x1 = nodes[e2][0] - 0.2;
        return { p: [x0 + (x1 - x0) * t2, rr(-0.012, 0.012), rr(-0.012, 0.012)], c: SOFT, a: [4, 0, 0], f: 0.3 };
      }
      var t3 = rnd(), xa = nodes[2][0], xb = nodes[1][0];
      return { p: [xa + (xb - xa) * t3, -0.2 - 0.55 * Math.sin(3.14159 * t3), rr(-0.012, 0.012)], c: ROSE, a: [4, 0, 1], f: 0.4 };
    }),
    /* 4 multi-segment nanowires */
    shape(function (i, u) {
      var a = rr(0, 6.2832), fr = rnd();
      if (u < 0.55) { var r = 0.13; return { p: [-1.9 + fr * 3.8, Math.sin(a) * r + 0.15, Math.cos(a) * r], c: metalAt(fr), f: 0.3 }; }
      var w = smallWires[Math.floor(rnd() * 6)], d = (fr - 0.5) * w.len, r2 = 0.05, lx = d, ly = Math.sin(a) * r2, lz = Math.cos(a) * r2;
      var ca = Math.cos(w.ang), sa = Math.sin(w.ang);
      return { p: [w.c[0] + lx * ca - ly * sa, w.c[1] + lx * sa + ly * ca + lx * 0, w.c[2] + lz + d * w.tilt], c: metalAt(fr), f: 0.3 };
    }),
    /* 5 Lenia organism */
    shape(function () {
      for (;;) {
        var r = Math.sqrt(rnd()) * 1.6, th = rr(0, 6.2832);
        var v = Math.exp(-Math.pow((r - 1.0) / 0.2, 2)) * (0.55 + 0.45 * Math.cos(th - 0.6)) + 0.9 * Math.exp(-Math.pow((r - 0.38) / 0.16, 2)) + 0.25 * Math.exp(-Math.pow(r / 0.12, 2));
        if (rnd() < v) return { p: [r * Math.cos(th), r * Math.sin(th), (v - 0.4) * 0.35 + rr(-0.03, 0.03)], c: r < 0.65 ? VIO : (rnd() < 0.5 ? TEAL : NICK), a: [5, 0, 0], f: 0.55 };
      }
    }),
    /* 6 ribbon behind the experience timeline */
    shape(function () {
      var x = rr(-2.6, 2.6), w = rr(-0.42, 0.42), ph = x * 1.5;
      return { p: [x, 0.55 * Math.sin(ph) + w * Math.cos(ph * 0.6), w * 1.4 * Math.sin(ph * 0.6) + 0.3 * Math.cos(ph)], c: Math.abs(w) > 0.36 ? GOLD : (rnd() < 0.5 ? VIO : TEAL), a: [6, 0, 0], f: 0.5 };
    }),
    /* 7 crystal lattice behind the index */
    shape(function () {
      var gi = Math.floor(rnd() * 7), gj = Math.floor(rnd() * 5), gk = Math.floor(rnd() * 3), s = 0.55;
      var c = [(gi - 3) * s, (gj - 2) * s, (gk - 1) * s], odd = (gi + gj + gk) % 2;
      if (rnd() < 0.3) { var ax = Math.floor(rnd() * 3), f = rnd(); c[ax] += f * s; return { p: [c[0] + rr(-0.01, 0.01), c[1] + rr(-0.01, 0.01), c[2] + rr(-0.01, 0.01)], c: SLATE, f: 0.15 }; }
      return { p: onSphere(c, odd ? 0.085 : 0.11), c: odd ? TEAL : GOLD, f: 0.6 };
    }),
    /* 7 dust behind the last screen */
    shape(function () { var far = rnd() < 0.9; return { p: [far ? (rnd() < 0.5 ? -1 : 1) * rr(9, 13) : rr(-5.5, 5.5), rr(-3.2, 3.2), rr(-3, 0.5)], c: rnd() < 0.5 ? SOFT : SLATE, a: [6, 0, 0], f: 0.3 }; })
  ];
  var S = shapes.length;

  var geo = new THREE.BufferGeometry();
  var aFrom = new THREE.BufferAttribute(new Float32Array(N * 3), 3), aTo = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  var cFrom = new THREE.BufferAttribute(new Float32Array(N * 3), 3), cTo = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  var xFrom = new THREE.BufferAttribute(new Float32Array(N * 3), 3), xTo = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  var fAttr = new THREE.BufferAttribute(new Float32Array(N * 2), 2), rArr = new Float32Array(N * 3);
  for (var q = 0; q < N * 3; q++) rArr[q] = rnd();
  geo.setAttribute('position', aFrom); geo.setAttribute('posTo', aTo); geo.setAttribute('colFrom', cFrom); geo.setAttribute('colTo', cTo);
  geo.setAttribute('auxFrom', xFrom); geo.setAttribute('auxTo', xTo); geo.setAttribute('aFoil', fAttr); geo.setAttribute('aRnd', new THREE.BufferAttribute(rArr, 3));
  var curSeg = -1;
  function setSeg(seg) { setPair(shapes[seg], shapes[seg + 1], seg); }
  function setPair(A, B, key) {
    if (key === curSeg) return; curSeg = key;
    aFrom.array.set(A.pos); aTo.array.set(B.pos); cFrom.array.set(A.col); cTo.array.set(B.col); xFrom.array.set(A.aux); xTo.array.set(B.aux);
    for (var i = 0; i < N; i++) { fAttr.array[i * 2] = A.foil[i]; fAttr.array[i * 2 + 1] = B.foil[i]; }
    aFrom.needsUpdate = aTo.needsUpdate = cFrom.needsUpdate = cTo.needsUpdate = xFrom.needsUpdate = xTo.needsUpdate = fAttr.needsUpdate = true;
  }

  /* ---------- intro: particle portrait, then a cleanroom suit built around it ---------- */
  var PORT = null, SUIT = null;
  function blank() { return { pos: new Float32Array(N * 3), col: new Float32Array(N * 3), aux: new Float32Array(N * 3), foil: new Float32Array(N) }; }
  function buildPortrait() {
    var img = document.querySelector('.hello img'); if (!img || !img.complete || !img.naturalWidth) return false;
    var IW = 210, IH = 280, cv = document.createElement('canvas'), mk = document.createElement('canvas'), px, md;
    cv.width = mk.width = IW; cv.height = mk.height = IH;
    try {
      var cx = cv.getContext('2d'); cx.drawImage(img, 0, 0, IW, IH); px = cx.getImageData(0, 0, IW, IH).data;
      var mx = mk.getContext('2d'), poly = [[150,62],[200,52],[250,60],[278,100],[288,170],[282,215],[262,262],[262,300],[330,330],[400,372],[420,420],[420,560],[0,560],[0,400],[30,350],[110,315],[150,295],[150,262],[132,215],[122,170],[128,100]];
      mx.beginPath(); poly.forEach(function (q, i) { if (i) mx.lineTo(q[0] / 2, q[1] / 2); else mx.moveTo(q[0] / 2, q[1] / 2); }); mx.closePath(); mx.fill();
      md = mx.getImageData(0, 0, IW, IH).data;
    } catch (e) { return false; }
    function world(x, y) { return [(x / IW - 0.5) * 2.4, (0.5 - y / IH) * 3.2]; }
    function inMask(x, y) { return md[(Math.floor(y) * IW + Math.floor(x)) * 4 + 3] > 128; }
    var P = blank(), Sx = blank(), nP = Math.floor(N * 0.6), i, x, y, k, w, tries;
    for (i = 0; i < nP; i++) {
      var r = 0, g = 0, b = 0, dark = 0;
      for (tries = 0; tries < 300; tries++) {
        x = rnd() * IW; y = rnd() * IH; if (!inMask(x, y)) continue;
        k = (Math.floor(y) * IW + Math.floor(x)) * 4; r = px[k] / 255; g = px[k + 1] / 255; b = px[k + 2] / 255;
        dark = 1 - (0.299 * r + 0.587 * g + 0.114 * b);
        if (rnd() < Math.pow(dark, 1.2) * 0.95 + 0.07) break;
      }
      w = world(x, y);
      [P, Sx].forEach(function (s) { s.pos.set([w[0], w[1], dark * 0.08], i * 3); s.col.set([r * 0.8, g * 0.8, b * 0.8], i * 3); s.foil[i] = 0.1; });
      var oo = Math.pow((x - 101.5) / 54, 2) + Math.pow((y - 80) / 69, 2), ff = Math.pow((x - 102.5) / 30, 2) + Math.pow((y - 95) / 38, 2);
      if (y > 148 || (oo <= 1 && ff >= 1)) { Sx.col.set([r * 0.22 + 0.62 * 0.72, g * 0.22 + 0.77 * 0.72, b * 0.22 + 0.90 * 0.72], i * 3); Sx.foil[i] = 0.45; }
    }
    var LIGHT = [0.36, 0.58, 0.81], PALE = [0.62, 0.77, 0.90], EDGE = [0.12, 0.31, 0.56];
    for (i = nP; i < N; i++) {
      var part = rnd(), col = rnd() < 0.5 ? LIGHT : PALE;
      for (tries = 0; tries < 400; tries++) {
        if (part < 0.38) { x = rr(46, 156); y = rr(8, 150); var o = Math.pow((x - 101.5) / 54, 2) + Math.pow((y - 80) / 69, 2), f = Math.pow((x - 102.5) / 30, 2) + Math.pow((y - 95) / 38, 2); if (o <= 1 && f >= 1) { if (f < 1.14 || o > 0.9) col = EDGE; break; } }
        else if (part < 0.9) { x = rnd() * IW; y = rr(144, IH); if (inMask(x, y)) { if (!inMask(x, y - 3) || !inMask(x - 3, y) || !inMask(x + 3, y)) col = EDGE; break; } }
        else { x = 102.5 + rr(-1.2, 1.2); y = rr(152, IH); col = EDGE; break; }
      }
      w = world(x, y);
      P.pos.set([rr(-1.5, 1.5), rr(-2.7, -2.0), rr(-0.3, 0.3)], i * 3); P.col.set(col, i * 3); P.foil[i] = 0.5;
      Sx.pos.set([w[0], w[1], 0.09 + rr(0, 0.03)], i * 3); Sx.col.set(col, i * 3); Sx.foil[i] = 0.7; Sx.aux.set([7, (1 - y / IH) * 0.6, 0], i * 3);
    }
    PORT = P; SUIT = Sx; return true;
  }
  var intro = { on: false, t0: null }, spin = 0, replayBtn = document.getElementById('replay');
  function startIntro() { if (reduce || !PORT) return; intro.on = true; intro.t0 = null; }
  (function () {
    var img = document.querySelector('.hello img');
    function go() { if (buildPortrait()) { replayBtn.hidden = false; if (window.scrollY < 10) startIntro(); } }
    if (img && img.complete) go(); else if (img) img.addEventListener('load', go);
  })();
  replayBtn.addEventListener('click', function () { window.scrollTo(0, 0); pSmooth = 0; startIntro(); });

  var mat = new THREE.ShaderMaterial({
    transparent: true, depthTest: false, depthWrite: false,
    uniforms: { uTime: { value: 0 }, uT: { value: 0 }, uSize: { value: 30 }, uFreq: { value: 20 }, uEd: { value: 1 }, uAspect: { value: 1 }, uRates: { value: new THREE.Vector4(1, 1, 1, 1) }, uBurst: { value: 1 }, uMouse: { value: new THREE.Vector2(0, 0) } },
    vertexShader: [
      'attribute vec3 posTo, colFrom, colTo, auxFrom, auxTo, aRnd; attribute vec2 aFoil;',
      'uniform float uTime, uT, uSize, uFreq, uAspect, uBurst; uniform vec2 uMouse; uniform vec4 uRates; varying vec3 vCol; varying float vFoil, vPhase, vFlash, vHover;',
      'float is(float k, float v){ return 1.0 - step(0.5, abs(k - v)); }',
      'vec3 move(vec3 aux, vec3 p){',
      ' vec3 o = vec3(0.0);',
      ' o += is(aux.x, 6.0) * 0.07 * vec3(sin(uTime * 0.5 + aRnd.x * 40.0), cos(uTime * 0.4 + aRnd.y * 40.0), sin(uTime * 0.3 + aRnd.z * 40.0));',
      ' o += is(aux.x, 1.0) * vec3(sin(uTime * 0.6 + aRnd.x * 6.283) * 0.16, sin(uTime * 0.45 + aRnd.y * 40.0) * 0.12, cos(uTime * 0.5 + aRnd.z * 6.283) * 0.14);',
      ' float r = length(p.xy);',
      ' o += is(aux.x, 5.0) * (vec3(p.xy, 0.0) * 0.07 * sin(uTime * 1.3 - r * 4.5) + vec3(0.0, 0.0, 0.1 * sin(uTime * 1.3 - r * 4.5 + 1.0)));',
      ' return o; }',
      'float flash(vec3 aux, vec3 p){',
      ' float rate = aux.z < 0.5 ? uRates.x : (aux.z < 1.5 ? uRates.y : (aux.z < 2.5 ? uRates.z : uRates.w));',
      ' float spike = pow(max(0.0, sin(uTime * rate * 6.283 + aux.y * 2.1)), 24.0);',
      ' float wave = pow(max(0.0, sin(p.y * 7.0 + uTime * (3.0 + uFreq * 0.12))), 10.0) * 0.8;',
      ' float dir = 1.0 - 2.0 * aux.z;',
      ' float flow = pow(max(0.0, sin(p.x * 4.0 * dir - uTime * 3.2 + aux.y)), 10.0) * 0.9;',
      ' float ring = pow(max(0.0, sin(uTime * 1.3 - length(p.xy) * 4.5)), 6.0) * 0.35;',
      ' return is(aux.x, 2.0) * spike + is(aux.x, 3.0) * wave + is(aux.x, 4.0) * flow + is(aux.x, 5.0) * ring; }',
      'void main(){',
      ' float t = smoothstep(0.18, 0.82, uT);',
      ' float tp = mix(t, smoothstep(auxTo.y, auxTo.y + 0.35, uT), is(auxTo.x, 7.0));',
      ' vec3 pos = mix(position, posTo, tp);',
      ' vec3 col = mix(colFrom, colTo, tp);',
      ' vFoil = mix(aFoil.x, aFoil.y, tp);',
      ' float bell = sin(3.14159 * t);',
      ' pos += (1.0 - t) * move(auxFrom, position) + t * move(auxTo, posTo);',
      ' pos += (aRnd - 0.5) * bell * 1.1 * uBurst;',
      ' float ch = floor(aRnd.x * 3.0);',
      ' pos.x += (ch - 1.0) * bell * 0.09 * uBurst;',
      ' vec3 split = ch < 0.5 ? vec3(0.85, 0.12, 0.25) : (ch < 1.5 ? vec3(0.1, 0.6, 0.35) : vec3(0.15, 0.25, 0.85));',
      ' col = mix(col, split, bell * 0.65 * uBurst);',
      ' vFlash = (1.0 - t) * flash(auxFrom, position) + t * flash(auxTo, posTo);',
      ' vCol = col; vPhase = dot(pos, vec3(0.55, 0.85, 0.3)) + uMouse.x * 0.9 + uMouse.y * 0.6;',
      ' vec4 mv = modelViewMatrix * vec4(pos, 1.0);',
      ' gl_PointSize = uSize * (0.75 + 0.5 * aRnd.y) * (1.0 + vFlash * 0.45) / -mv.z;',
      ' gl_Position = projectionMatrix * mv;',
      ' vec2 nd = gl_Position.xy / gl_Position.w;',
      ' vHover = smoothstep(0.6, 0.05, distance(nd * vec2(uAspect, 1.0), vec2(uMouse.x * uAspect, -uMouse.y))); }'
    ].join('\n'),
    fragmentShader: [
      'precision highp float; uniform float uTime, uEd; varying vec3 vCol; varying float vFoil, vPhase, vFlash, vHover;',
      'void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c); if (d > 0.5) discard;',
      ' float amt = max(vFoil, 0.5);',
      ' vec3 pp = 0.5 + 0.5 * cos(6.2832 * (vPhase * 1.25 + uTime * 0.11 + vec3(0.0, 0.33, 0.67)));',
      ' pp = mix(vec3(dot(pp, vec3(0.333))), pp, 1.5) * 0.86;',
      ' float band = pow(max(0.0, sin(vPhase * 2.6 - uTime * 0.7)), 14.0);',
      ' vec3 poly = mix(vCol, vCol * 0.55 + pp * 0.6, amt * 0.85) + vec3(1.0, 0.93, 0.78) * band * amt * 0.6;',
      ' vec3 fp = 0.5 + 0.5 * cos(6.2832 * (vPhase + uTime * 0.04 + vec3(0.0, 0.33, 0.67)));',
      ' vec3 foil = mix(vCol, vCol * 0.6 + fp * 0.5, vFoil * 0.6);',
      ' vec3 col = uEd > 1.5 ? poly : (uEd > 0.5 ? mix(foil, poly, vHover) : vCol);',
      ' col = mix(col, vec3(1.0, 0.72, 0.18), vFlash * 0.8);',
      ' float a = smoothstep(0.5, 0.32, d) * 0.9; gl_FragColor = vec4(col, a); }'
    ].join('\n')
  });
  var points = new THREE.Points(geo, mat); points.frustumCulled = false;
  var scene = new THREE.Scene(); scene.add(points);
  var camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50); camera.position.set(0, 0, 8.5);

  /* ---------- callouts ---------- */
  var defs = [
    { s: 1, at: [0.15, -0.38, 0], dx: -40, dy: -130, t: 'InAs nanowire', d: 'the sensing channel' },
    { s: 1, at: [1.3, -0.16, 0.2], dx: 60, dy: -90, t: 'Source / drain contacts', d: 'bilayer photolithography', wide: true },
    { s: 1, at: [-1.7, -0.5, 0.9], dx: -70, dy: 70, t: 'p⁺ Si / SiO₂ back gate', d: '100 nm oxide', wide: true },
    { s: 1, at: [0.3, 0.55, 0], dx: 90, dy: -40, t: 'Analyte', d: 'pH, biotin–streptavidin' },
    { s: 2, at: [0, 1.6, 0], dx: 70, dy: -30, t: 'Stimulating electrode', d: '100 µA pulses, 1–100 Hz' },
    { s: 2, at: somas[0], dx: -70, dy: -60, t: 'STN', d: '' },
    { s: 2, at: somas[1], dx: 60, dy: -20, t: 'Vim', d: '' },
    { s: 2, at: somas[2], dx: -80, dy: 30, t: 'SNr', d: '' },
    { s: 2, at: somas[3], dx: 60, dy: -50, t: 'Rt', d: '' },
    { s: 3, at: [-1.75, 0.35, 0], dx: -60, dy: -90, t: 'Papers', d: 'text, tables, figures' },
    { s: 3, at: nodes[1], dx: -50, dy: -110, t: 'Extractor', d: 'Ms, Hc, (BH)max as JSON', wide: true },
    { s: 3, at: nodes[2], dx: 30, dy: -90, t: 'Physics validator', d: 'Mr ≤ Ms, units, quotes' },
    { s: 3, at: [0.8, -0.75, 0], dx: -170, dy: 40, t: 'Self-correction loop', d: 'one extra call', wide: true },
    { s: 4, at: [-1.1, 0.28, 0], dx: -70, dy: -100, t: 'Ag', d: 'sacrificial base, 8 µm' },
    { s: 4, at: [0.0, 0.28, 0], dx: -20, dy: -130, t: 'Pd', d: 'catalytic', wide: true },
    { s: 4, at: [0.42, 0.28, 0], dx: 40, dy: -90, t: 'Au', d: 'conductive' },
    { s: 4, at: [0.62, 0.02, 0], dx: 60, dy: 60, t: 'Ni', d: 'magnetic', wide: true },
    { s: 5, at: [0.9, 0.5, 0.1], dx: 70, dy: -80, t: 'Evolved organism', d: '7 rule parameters' },
    { s: 5, at: [-0.3, -0.2, 0.2], dx: -170, dy: 50, t: 'Damage test', d: 'shape alone did not self-repair', wide: true }
  ];
  var svg = document.getElementById('callouts'), NS = 'http://www.w3.org/2000/svg';
  defs.forEach(function (c) {
    c.v = new THREE.Vector3(c.at[0], c.at[1], c.at[2]);
    c.line = document.createElementNS(NS, 'line'); c.dot = document.createElementNS(NS, 'circle'); c.dot.setAttribute('r', 2.5);
    svg.appendChild(c.line); svg.appendChild(c.dot);
    c.el = document.createElement('div'); c.el.className = 'callout' + (c.wide ? ' wide-only' : '');
    var b = document.createElement('b'); b.textContent = c.t; c.el.appendChild(b); c.el.appendChild(document.createTextNode(c.d));
    document.body.appendChild(c.el);
  });

  /* ---------- frame loop ---------- */
  var secs = Array.prototype.slice.call(document.querySelectorAll('.screen'));
  var W = 1, H = 1, mouse = { x: 0, y: 0, tx: 0, ty: 0 }, pSmooth = 0, time = 0, last = performance.now();
  var hudPh = document.getElementById('hud-ph'), hudRot = document.getElementById('hud-rot');
  var posX = [1.9, 1.35, 0.75, 1.15, 1.2, 1.6, 3.3, 3.15, 0], posY = [0.35, 0.35, 0.65, 0.5, 0.45, 0.4, -0.2, 0.3, 0],
      rotY = [0, -0.55, 0.2, 0.12, -0.3, 0.1, 1.2, 0.55, 0], rotX = [0.28, 0.28, 0.28, 0.08, 0.3, -0.5, 0.2, 0.35, 0.1], scl = [1, 1, 1, 0.9, 0.95, 1, 0.7, 0.62, 1.2];
  function lerpArr(a, seg, t) { return a[seg] + (a[seg + 1] - a[seg]) * t; }
  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
    bgMat.uniforms.uAspect.value = W / H;
    mat.uniforms.uSize.value = 30 * renderer.getPixelRatio() * (H / 800) * (N < 12000 ? 1.3 : 1);
    mat.uniforms.uAspect.value = W / H;
  }
  window.addEventListener('resize', resize); resize();
  window.addEventListener('pointermove', function (e) { mouse.tx = (e.clientX / W) * 2 - 1; mouse.ty = (e.clientY / H) * 2 - 1; });
  function scrollP() {
    var y = window.scrollY;
    for (var i = secs.length - 1; i >= 0; i--) {
      var top = secs[i].offsetTop;
      if (y >= top) {
        if (i === secs.length - 1) return S - 1;
        return Math.min(S - 1, i + (y - top) / Math.max(1, secs[i + 1].offsetTop - top));
      }
    }
    return 0;
  }
  var tmp = new THREE.Vector3(), skT = 0, lastSk = 0, skPos = new THREE.Vector3(), skDir = new THREE.Vector3();
  function frame(now) {
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!reduce) time += dt;
    if (!reduce && !intro.on) spin += dt * 0.12;
    mouse.x += (mouse.tx - mouse.x) * 0.06; mouse.y += (mouse.ty - mouse.y) * 0.06;
    pSmooth += (scrollP() - pSmooth) * (reduce ? 1 : 0.09);
    var p = pSmooth, narrow = W < 700, seg = Math.min(S - 2, Math.floor(p)), t = Math.min(1, p - seg), ts = t, burst = 1, face = 0;
    if (intro.on) {
      if (scrollP() > 0.04) { intro.on = false; curSeg = -1; }
      else {
        if (intro.t0 === null) intro.t0 = now;
        var s = (now - intro.t0) / 1000; face = 1;
        if (s < 1.6) { setPair(shapes[0], PORT, 'ia'); t = s / 1.6; }
        else if (s < 5.8) { setPair(PORT, SUIT, 'ib'); t = Math.max(0, Math.min(1, (s - 2.2) / 2.2)); burst = 0; }
        else if (s < 7.4) { setPair(SUIT, shapes[0], 'ic'); t = (s - 5.8) / 1.6; face = 1 - t * t; }
        else { intro.on = false; curSeg = -1; face = 0; t = ts; }
      }
    }
    var skK = window.skillShape || 0, onSk = !intro.on && p > S - 1.4 && skK > 0;
    if (onSk) lastSk = skK;
    skT += ((onSk ? 1 : 0) - skT) * (reduce ? 1 : 0.07);
    if (!intro.on) { if (skT > 0.004 && lastSk) { setPair(shapes[S - 1], shapes[lastSk], 'sk' + lastSk); t = skT; } else setSeg(seg); }
    var te = ts * ts * (3 - 2 * ts), w0 = Math.max(0, 1 - p);
    var sc = (narrow ? Math.min(1, W / 520) * 0.82 : Math.min(1.15, W / 1250 + 0.25)) * lerpArr(scl, seg, te);
    points.scale.setScalar(sc);
    points.position.x = narrow ? 0 : lerpArr(posX, seg, te) * Math.min(1, Math.max(0.55, (W - 560) / 760));
    points.position.y = narrow ? lerpArr([1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 3.6, 0, 0], seg, te) : lerpArr(posY, seg, te);
    if (skT > 0.004) {
      var tr = table.getBoundingClientRect();
      skPos.set(((tr.left + tr.width / 2) / W) * 2 - 1, 1 - ((tr.top + tr.height / 2) / H) * 2, 0.5).unproject(camera);
      skDir.copy(skPos).sub(camera.position).normalize(); skPos.copy(camera.position).add(skDir.multiplyScalar(-camera.position.z / skDir.z));
      var ke = skT * skT * (3 - 2 * skT);
      points.position.x += (skPos.x - points.position.x) * ke; points.position.y += (skPos.y - points.position.y) * ke;
      points.scale.setScalar(sc + ((narrow ? 0.55 : 0.85) - sc) * ke);
    }
    points.rotation.y = (w0 * spin + lerpArr(rotY, seg, te)) * (1 - face) + mouse.x * (0.35 - 0.2 * face);
    points.rotation.x = lerpArr(rotX, seg, te) * (1 - face) + mouse.y * (0.18 - 0.1 * face);
    points.updateMatrixWorld();
    mat.uniforms.uTime.value = time; mat.uniforms.uT.value = t; mat.uniforms.uBurst.value = burst; mat.uniforms.uFreq.value = freq; mat.uniforms.uEd.value = edVal; mat.uniforms.uRates.value.set(rates[0], rates[1], rates[2], rates[3]); mat.uniforms.uMouse.value.set(mouse.x, mouse.y);
    tmp.set(0, 0, 0).applyMatrix4(points.matrixWorld).project(camera);
    bgMat.uniforms.uObj.value.set(tmp.x * 0.5 + 0.5, tmp.y * 0.5 + 0.5);
    bgMat.uniforms.uMouse.value.set(mouse.x * 0.5 + 0.5, 0.5 - mouse.y * 0.5);
    bgMat.uniforms.uTime.value = time; bgMat.uniforms.uP.value = p;
    renderer.clear(); renderer.render(bgScene, bgCam); renderer.render(scene, camera);

    defs.forEach(function (c) {
      var op = Math.max(0, 1 - Math.abs(p - c.s) * 4.5), show = op > 0.02 && !(narrow && c.wide);
      if (!show) { c.el.style.opacity = 0; c.line.style.opacity = 0; c.dot.style.opacity = 0; return; }
      tmp.copy(c.v).applyMatrix4(points.matrixWorld).project(camera);
      var x = (tmp.x * 0.5 + 0.5) * W, y = (0.5 - tmp.y * 0.5) * H, k = narrow ? 0.55 : 1;
      var lx = Math.max(12, Math.min(W - 200, x + c.dx * k)), ly = Math.max(84, Math.min(H - 60, y + c.dy * k));
      c.el.style.opacity = op; c.line.style.opacity = op * 0.8; c.dot.style.opacity = op;
      c.el.style.transform = 'translate(' + lx.toFixed(1) + 'px,' + ly.toFixed(1) + 'px)';
      c.line.setAttribute('x1', x.toFixed(1)); c.line.setAttribute('y1', y.toFixed(1));
      c.line.setAttribute('x2', (lx + 4).toFixed(1)); c.line.setAttribute('y2', (ly + 10).toFixed(1));
      c.dot.setAttribute('cx', x.toFixed(1)); c.dot.setAttribute('cy', y.toFixed(1));
    });
    hudPh.textContent = 'pH ' + (4 + p).toFixed(1);
    var deg = ((points.rotation.y * 57.2958) % 360 + 360) % 360;
    hudRot.textContent = 'ROT ' + ('00' + Math.round(deg)).slice(-3) + '°';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
