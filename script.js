// Nav
function toggleNav() {
	const nav = document.querySelector('.nav');
	if (parseInt(nav.dataset.active) == 1) {
		nav.dataset.active = 0;
	} else {
		nav.dataset.active = 1;
	}
}

// Set page colors
if ((typeof pageColors === "undefined")) {
	var pageColors = {'primary': [214, 50, 19], 'secondary': [0, 0, 89]};
}
pageColorsBackup = structuredClone(pageColors);
const primaryHue = document.querySelector('#primary-hue');
const primarySaturation = document.querySelector('#primary-saturation');
const primaryLightness = document.querySelector('#primary-lightness');
const secondaryHue = document.querySelector('#secondary-hue');
const secondarySaturation = document.querySelector('#secondary-saturation');
const secondaryLightness = document.querySelector('#secondary-lightness');
function initPageColors() {
	primaryHue.querySelector('input').value = pageColors['primary'][0];
	primarySaturation.querySelector('input').value = pageColors['primary'][1];
	primaryLightness.querySelector('input').value = pageColors['primary'][2];
	secondaryHue.querySelector('input').value = pageColors['secondary'][0];
	secondarySaturation.querySelector('input').value = pageColors['secondary'][1];
	secondaryLightness.querySelector('input').value = pageColors['secondary'][2];

	primaryHue.querySelector('output').value = pageColors['primary'][0];
	primarySaturation.querySelector('output').value = pageColors['primary'][1];
	primaryLightness.querySelector('output').value = pageColors['primary'][2];
	secondaryHue.querySelector('output').value = pageColors['secondary'][0];
	secondarySaturation.querySelector('output').value = pageColors['secondary'][1];
	secondaryLightness.querySelector('output').value = pageColors['secondary'][2];

	document.documentElement.style.setProperty('--color1', `hsl(${pageColors['primary'][0]}deg, ${pageColors['primary'][1]}%, ${pageColors['primary'][2]}%)`);
	document.documentElement.style.setProperty('--color2', `hsl(${pageColors['secondary'][0]}deg, ${pageColors['secondary'][1]}%, ${pageColors['secondary'][2]}%)`);
}
initPageColors();

// Update page primary and secondary colors
function updatePageColor(color, index, value) {
	pageColors[color][index] = parseInt(value);
	document.documentElement.style.setProperty('--color1', `hsl(${pageColors['primary'][0]}deg, ${pageColors['primary'][1]}%, ${pageColors['primary'][2]}%)`);
	document.documentElement.style.setProperty('--color2', `hsl(${pageColors['secondary'][0]}deg, ${pageColors['secondary'][1]}%, ${pageColors['secondary'][2]}%)`);
}

// Light and dark mode
let colorMode = 'light';
function changeColorMode() {
	const body = document.querySelector('body');
	if (colorMode == 'light') {
		colorMode = 'dark';
	} else {
		colorMode = 'light';
	}
	body.dataset.mode = colorMode;
}

// Toggle element outlines
let outlines = false;
function toggleOutlines() {
	const body = document.querySelector('body');
	if (outlines) {
		outlines = false;
	} else {
		outlines = true;
	}
	body.dataset.outlines = outlines;
}

// Reset pagewide visual settings
function resetPageSettings() {
	const body = document.querySelector('body');
	colorMode = 'light';
	body.dataset.mode = colorMode;
	outlines = false;
	body.dataset.outlines = outlines;
	pageColors = structuredClone(pageColorsBackup);
	initPageColors();
}

// Open and close page color settings
function openPageSettings() {
	const pageSettingsToggle = document.querySelector('.controls-toggle');
	const pageSettingsMenu = document.querySelector('.controls');
	pageSettingsToggle.dataset.active = 0;
	pageSettingsMenu.dataset.active = 1;
}
function closePageSettings() {
	const pageSettingsToggle = document.querySelector('.controls-toggle');
	const pageSettingsMenu = document.querySelector('.controls');
	pageSettingsToggle.dataset.active = 1;
	pageSettingsMenu.dataset.active = 0;
}

// Fix specimen tester textarea heights
function fixTesterHeight(elmnt) {
	for (let textarea of elmnt.querySelectorAll('textarea')) {
		textarea.style.height = '';
		textarea.style.height = textarea.scrollHeight + "px";
	}
}
function fixAllTesterHeights() {
	for (let tester of document.querySelectorAll('.specimen-tester-editable')) {
		for (let textarea of tester.querySelectorAll('textarea')) {
			textarea.style.height = '';
			textarea.style.height = textarea.scrollHeight + "px";
		}
	}
}
window.addEventListener('resize', fixAllTesterHeights);

// Generate testers
function generateTesters() {
	// Create tester elements based off data
	let temp = '';
	for (let key of Object.keys(testers)) {
		let data = testers[key];

		let texts = '';
		for (let text of data['text']) {
			texts += `<textarea spellcheck="false" name="tester">${text}</textarea>`;
		}

		temp += `
			<div class="specimen-tester" data-style="${data['style']}" data-features="${data['features']}" data-fontsize="${data['fontsize']}" data-lineheight="${data['lineheight']}" data-letterspacing="${data['letterspacing']}" data-align="${data['align']}">
				<div class="specimen-tester-controls">
					<div class="specimen-tester-select" data-type="select">
						<div class="specimen-tester-select-dropdown">Styles <span class="symbol">arrow_drop_down</span></div>
					</div>
		
					<div class="specimen-tester-select" data-type="multi">
						<div class="specimen-tester-select-dropdown">Features <span class="symbol">arrow_drop_down</span></div>
					</div>
		
					<div class="specimen-tester-controls-spacer"></div>
		
					<form class="specimen-tester-slider" data-type="fontsize">
						<label for="fontsize"><span class="symbol">format_size</span></label>
						<input type="range" min=".5" max="20" value="4" id="fontsize" step="0.1">
						<output id="fontsizevalue" for="fontsize" style="width: 3em;">4.0</output>
					</form>
		
					<form class="specimen-tester-slider" data-type="leading">
						<label for="leading"><span class="symbol">format_line_spacing</span></label>
						<input type="range" min="0.5" max="2" value="1" step="0.01" id="leading">
						<output id="leadingvalue" for="leading" style="width: 3em;">1.00</output>
					</form>
		
					<form class="specimen-tester-slider" data-type="tracking">
						<label for="tracking"><span class="symbol">format_letter_spacing</span></label>
						<input type="range" min="-.2" max=".2" value="0" step="0.01" id="tracking">
						<output id="trackingvalue" for="fontsize" style="width: 3em;">0.00</output>
					</form>
		
					<div class="specimen-tester-toggles">
						<div class="specimen-tester-alignment">
							<button id="alignleft"><span class="symbol">format_align_left</span></button>
							<button id="aligncenter" data-active="1"><span class="symbol">format_align_center</span></button>
							<button id="alignright"><span class="symbol">format_align_right</span></button>
						</div>
						<div class="specimen-tester-toggles-spacer"></div>
						<button id="reset" class="specimen-tester-reset"><span class="symbol">refresh</span></button>
					</div>
				</div>
				<div class="specimen-tester-editable">
					${texts}
				</div>
			</div>
		`
	}

	const testerContainer = document.querySelector('#test');
	testerContainer.innerHTML = temp;

	// Update size on input
	for (let slider of testerContainer.querySelectorAll('.specimen-tester-slider[data-type="fontsize"]')) {
		slider.addEventListener('input', () => {slider.querySelector('output').value = parseFloat(slider.querySelector('input').value).toFixed(1)});
	}
	for (let slider of testerContainer.querySelectorAll('.specimen-tester-slider[data-type="leading"]')) {
		slider.addEventListener('input', () => {slider.querySelector('output').value = parseFloat(slider.querySelector('input').value).toFixed(2)});
	}
	for (let slider of testerContainer.querySelectorAll('.specimen-tester-slider[data-type="tracking"]')) {
		slider.addEventListener('input', () => {slider.querySelector('output').value = parseFloat(slider.querySelector('input').value).toFixed(2)});
	}
	for (let tester of document.querySelectorAll('.specimen-tester-editable')) {
		setTimeout(() => {
			fixTesterHeight(tester);
		}, 100)
		tester.addEventListener('input', () => {fixTesterHeight(tester)});
	}

	// Add functionality to testers and initalize styles
	for (let tester of document.querySelectorAll('.specimen-tester')) {
		const testerText = tester.querySelector('.specimen-tester-editable');

		// Controls
		const sliderFontsize = tester.querySelector('#fontsize');
		const sliderFontsizeOutput = tester.querySelector('#fontsizevalue');
		const sliderLeading = tester.querySelector('#leading');
		const sliderLeadingOutput = tester.querySelector('#leadingvalue');
		const sliderTracking = tester.querySelector('#tracking');
		const sliderTrackingOutput = tester.querySelector('#trackingvalue');
		const alignLeft = tester.querySelector('#alignleft');
		const alignCenter = tester.querySelector('#aligncenter');
		const alignRight = tester.querySelector('#alignright');
		const reset = tester.querySelector('#reset');
		sliderFontsize.addEventListener('input', () => {
			testerText.style.fontSize = sliderFontsize.value + 'vw';
			fixTesterHeight(testerText);
		})
		sliderLeading.addEventListener('input', () => {
			testerText.style.lineHeight = sliderLeading.value + 'em';
			fixTesterHeight(testerText);
		})
		sliderTracking.addEventListener('input', () => {
			testerText.style.letterSpacing = sliderTracking.value + 'em';
			fixTesterHeight(testerText);
		})
		alignLeft.addEventListener('click', () => {
			testerText.style.textAlign = 'left';
			alignLeft.dataset.active = 1;
			alignCenter.dataset.active = 0;
			alignRight.dataset.active = 0;
		})
		alignCenter.addEventListener('click', () => {
			testerText.style.textAlign = 'center';
			alignLeft.dataset.active = 0;
			alignCenter.dataset.active = 1;
			alignRight.dataset.active = 0;
		})
		alignRight.addEventListener('click', () => {
			testerText.style.textAlign = 'right';
			alignLeft.dataset.active = 0;
			alignCenter.dataset.active = 0;
			alignRight.dataset.active = 1;
		})
		reset.addEventListener('click', () => {
			initSettings();
		})

		// Init
		function initSettings() {
			testerText.style.fontSize = tester.dataset.fontsize + 'vw';
			sliderFontsize.value = parseFloat(tester.dataset.fontsize).toFixed(1);
			sliderFontsizeOutput.value = parseFloat(tester.dataset.fontsize).toFixed(1);
			testerText.style.lineHeight = tester.dataset.lineheight + 'em';
			sliderLeading.value = parseFloat(tester.dataset.lineheight).toFixed(2);
			sliderLeadingOutput.value = parseFloat(tester.dataset.lineheight).toFixed(2);
			testerText.style.letterSpacing = tester.dataset.letterspacing + 'em';sliderTracking.value = parseFloat(tester.dataset.letterspacing).toFixed(2);
			sliderTrackingOutput.value = parseFloat(tester.dataset.letterspacing).toFixed(2);
			testerText.style.textAlign = tester.dataset.align;
			if (tester.dataset.align == 'left') {
				alignLeft.dataset.active = 1;
				alignCenter.dataset.active = 0;
				alignRight.dataset.active = 0;
			} else if (tester.dataset.align == 'center') {
				alignLeft.dataset.active = 0;
				alignCenter.dataset.active = 1;
				alignRight.dataset.active = 0;
			} else if (tester.dataset.align == 'right') {
				alignLeft.dataset.active = 0;
				alignCenter.dataset.active = 0;
				alignRight.dataset.active = 1;
			}

			// STYLES
			// Set default value
			let selectedStyle = fontStyles[tester.dataset.style];
			for (let currentStyle of Object.keys(selectedStyle)) {
				testerText.style[currentStyle] = selectedStyle[currentStyle];
			}
			// Show default value in dropdown
			let dropdown = tester.querySelector('.specimen-tester-select-dropdown');
			dropdown.innerHTML = `${tester.dataset.style} <span class="symbol">arrow_drop_down</span>`;

			// OPTIONS
			// Set default value
			testerText.style.fontFeatureSettings = tester.dataset.features;
			// Set correct default toggles
			for (let option of tester.querySelectorAll('[data-type="multi"] .specimen-tester-select-option')) {
				if (option.classList.contains('specimen-glyphs-features')) {
					continue
				}
				if (tester.dataset.features.includes(fontFeatures[option.dataset.option])) {
					option.dataset.active = 1;
				} else {
					option.dataset.active = 0;
				}
			}

			fixTesterHeight(testerText);
		}
		initSettings();
	}
}

// Style single select dropdowns
let singleSelectOptions = '';
function populateSingleSelect() {
	// Generate single select options
	for (let key of Object.keys(fontStyles)) {
		singleSelectOptions += `<div class="specimen-tester-select-option" data-option="${key}">${key}</div>`;
	}

	// Create option elements
	for (let selectSingle of document.querySelectorAll('.specimen-tester-select[data-type="select"]')) {
		if (selectSingle.classList.contains('specimen-glyphs-style')) {
			continue
		}

		selectSingle.innerHTML += `
			<div class="specimen-tester-select-options" data-active="0">
				${singleSelectOptions}
			</div>
		`;

		// Add event listeners
		for (let option of selectSingle.querySelectorAll('.specimen-tester-select-option')) {
			option.addEventListener('click', () => {toggleSingleSelect(option)})
		}

		// Set default value
		let tester = selectSingle.closest('.specimen-tester');
		let testerEditable = tester.querySelector('.specimen-tester-editable');
		let selectedStyle = fontStyles[tester.dataset.style];
		for (let currentStyle of Object.keys(selectedStyle)) {
			testerEditable.style[currentStyle] = selectedStyle[currentStyle];
		}

		// Show default value in dropdown
		let dropdown = selectSingle.querySelector('.specimen-tester-select-dropdown');
		dropdown.innerHTML = `${tester.dataset.style} <span class="symbol">arrow_drop_down</span>`;
	}
}
function toggleSingleSelect(elmnt) {
	// Close options menu
	let options = elmnt.closest('.specimen-tester-select-options');
	options.dataset.active = 0;

	// Apply style to specimen tester
	let tester = elmnt.closest('.specimen-tester');
	let testerEditable = tester.querySelector('.specimen-tester-editable');
	let selectedStyle = fontStyles[elmnt.dataset.option];
	for (let currentStyle of Object.keys(selectedStyle)) {
		testerEditable.style[currentStyle] = selectedStyle[currentStyle];
	}

	// Change dropdown display to current style
	let dropdown = tester.querySelector('.specimen-tester-select-dropdown');
	dropdown.innerHTML = `${elmnt.dataset.option} <span class="symbol">arrow_drop_down</span>`;

	fixTesterHeight(testerEditable);
}

// Style multi select dropdowns
let multiSelectOptions = '';
function populateMultiSelect() {
	// Create multi select options
	for (let key of Object.keys(fontFeatures)) {
		multiSelectOptions += `
			<div class="specimen-tester-select-option" data-active="0" data-option="${key}">
				<span class="symbol specimen-tester-select-option-inactive">radio_button_unchecked</span><span class="symbol specimen-tester-select-option-active">radio_button_checked</span> ${key}
			</div>
		`;
	}

	// Create option elements
	for (let multiSelect of document.querySelectorAll('.specimen-tester-select[data-type="multi"]')) {
		if (multiSelect.classList.contains('specimen-glyphs-features')) {
			continue
		}

		multiSelect.innerHTML += `
			<div class="specimen-tester-select-options" data-active="0">
				${multiSelectOptions}
			</div>
		`;

		// Add event listeners
		for (let option of multiSelect.querySelectorAll('.specimen-tester-select-option')) {
			option.addEventListener('click', () => {toggleMultiSelect(option)})
		}

		// Set default value
		let tester = multiSelect.closest('.specimen-tester');
		let testerEditable = tester.querySelector('.specimen-tester-editable');
		testerEditable.style.fontFeatureSettings = tester.dataset.features;

		// Set correct default toggles
		for (let option of multiSelect.querySelectorAll('.specimen-tester-select-option')) {
			// I'm so sorry how convoluted this next line is woopsies
			if (tester.dataset.features.includes(fontFeatures[option.dataset.option])) {
				option.dataset.active = 1;
			}
		}
	}
}
function toggleMultiSelect(elmnt) {
	// Apply style to specimen tester
	let tester = elmnt.closest('.specimen-tester');
	let testerEditable = tester.querySelector('.specimen-tester-editable');
	if (parseInt(elmnt.dataset.active) == 1) {
		elmnt.dataset.active = 0;
	} else {
		elmnt.dataset.active = 1;
	}

	// Get all active options and create settings
	let options = '';
	for (let option of tester.querySelectorAll('.specimen-tester-select[data-type="multi"] .specimen-tester-select-option')) {
		if (parseInt(option.dataset.active) == 1) {
			options += `"${fontFeatures[option.dataset.option]}",`;
		}
	}
	testerEditable.style.fontFeatureSettings = options.slice(0, -1); // remove last comma

	fixTesterHeight(testerEditable);
}

// Generate testers if user defined
if ((typeof testers !== "undefined")) {
	generateTesters();
}
if ((typeof singleSelectOptions !== "undefined")) {
	populateSingleSelect();
}
if ((typeof multiSelectOptions !== "undefined")) {
	populateMultiSelect();
}

// Add dropdown event listeners
function refreshDropdownListeners() {
	for (let dropdown of document.querySelectorAll('.specimen-tester-select-dropdown')) {
		let options = dropdown.parentNode.querySelector('.specimen-tester-select-options');
		dropdown.addEventListener('click', () => {toggleSelect(options)});
	}
}
function toggleSelect(elmnt) {
	if (parseInt(elmnt.dataset.active) == 0) {
		elmnt.dataset.active = 1;
	} else {
		elmnt.dataset.active = 0;
	}
}
function openSelect(elmnt) {
	elmnt.dataset.active = 1;
}
function closeSelect(elmnt) {
	elmnt.dataset.active = 0;
}

// Glyph viewer
function generateGlyphs() {
	let temp = '';
	for (let key of Object.keys(glyphSets)) {
		temp += `<div class="specimen-glyphs-letterset-category"><h2>${key}</h2><ul>`;
		let glyphArray = glyphSets[key].split('');
		for (let glyph of glyphArray) {
			temp += `<li>${glyph}</li>`;
		}
		temp += '</ul></div>';
	}

	const glyphsLetterset = document.querySelector('.specimen-glyphs-letterset');
	glyphsLetterset.innerHTML = temp;

	// Add event listeners
	for (let li of glyphsLetterset.querySelectorAll('li')) {
		li.addEventListener('click', () => {setGlyph(li)})
	}
	function setGlyph(li) {
		for (let otherLi of glyphsLetterset.querySelectorAll('li')) {
			otherLi.dataset.active = 0;
		}
		li.dataset.active = 1;
		const glyphView = document.querySelector('.specimen-glyphs-detail-glyph');
		glyphView.innerHTML = li.innerText;

		const glyphCode = document.querySelector('.specimen-glyphs-detail-code');
		const glyphCar = document.querySelector('.specimen-glyphs-detail-char');
		glyphCode.innerText = "U+"+(li.innerText.charCodeAt()).toString().padStart(4, '0');
		glyphCar.innerHTML = `‘${li.innerText}’`;
	}
}
function setGlyphView(elmnt) {
	const glyphToggles = document.querySelectorAll('.specimen-glyphs-toggles button');
	for (let toggle of glyphToggles) {
		toggle.dataset.active = 0;
	}
	elmnt.dataset.active = 1;

	const glyphView = document.querySelector('.specimen-glyphs-detail-glyph');
	glyphView.dataset.state = elmnt.dataset.value;
}
generateGlyphs();

function generateGlyphDropdowns() {
	// STYLE
	// Set style dropdown default value
	let glyphSelect = document.querySelector('.specimen-glyphs-style');
	glyphSelect.innerHTML += `
		<div class="specimen-tester-select-options" data-active="0">
			${singleSelectOptions}
		</div>
	`;

	// Add event listeners
	for (let option of glyphSelect.querySelectorAll('.specimen-tester-select-option')) {
		option.addEventListener('click', () => {toggleSingleSelectGlyph(option)})
	}

	// Get first style and apply it
	let selectedStyle = fontStyles[Object.keys(fontStyles)[0]];
	for (let ul of document.querySelectorAll('.specimen-glyphs-letterset-category ul')) {
		for (let currentStyle of Object.keys(selectedStyle)) {
			ul.style[currentStyle] = selectedStyle[currentStyle];
		}
	}
	let glyphView = document.querySelector('.specimen-glyphs-detail-glyph');
	for (let currentStyle of Object.keys(selectedStyle)) {
		glyphView.style[currentStyle] = selectedStyle[currentStyle];
	}

	// Display correct value
	let dropdown = glyphSelect.querySelector('.specimen-tester-select-dropdown');
	dropdown.innerHTML = `${Object.keys(fontStyles)[0]} <span class="symbol">arrow_drop_down</span>`;

	// FEATURES
	let glyphFeatures = document.querySelector('.specimen-glyphs-features');
	glyphFeatures.innerHTML += `
		<div class="specimen-tester-select-options" data-active="0">
			${multiSelectOptions}
		</div>
	`;

	// Add event listeners
	for (let option of glyphFeatures.querySelectorAll('.specimen-tester-select-option')) {
		option.addEventListener('click', () => {toggleMultiSelectGlyph(option)})
	}
}
generateGlyphDropdowns();

function toggleSingleSelectGlyph(elmnt) {
	// Close options menu
	let options = elmnt.closest('.specimen-tester-select-options');
	options.dataset.active = 0;

	// Apply style to glyph viewer
	let selectedStyle = fontStyles[elmnt.dataset.option];
	for (let ul of document.querySelectorAll('.specimen-glyphs-letterset-category ul')) {
		for (let currentStyle of Object.keys(selectedStyle)) {
			ul.style[currentStyle] = selectedStyle[currentStyle];
		}
	}
	let glyphView = document.querySelector('.specimen-glyphs-detail-glyph');
	for (let currentStyle of Object.keys(selectedStyle)) {
		glyphView.style[currentStyle] = selectedStyle[currentStyle];
	}

	// Change dropdown display to current style
	let dropdown = elmnt.parentNode.parentNode.querySelector('.specimen-tester-select-dropdown');
	dropdown.innerHTML = `${elmnt.dataset.option} <span class="symbol">arrow_drop_down</span>`;
}
function toggleMultiSelectGlyph(elmnt) {
	if (parseInt(elmnt.dataset.active) == 1) {
		elmnt.dataset.active = 0;
	} else {
		elmnt.dataset.active = 1;
	}

	let glyphView = document.querySelector('.specimen-glyphs-detail-glyph');
	let options = '';
	for (let option of document.querySelectorAll('.specimen-glyphs-features .specimen-tester-select-option')) {
		if (parseInt(option.dataset.active) == 1) {
			options += `"${fontFeatures[option.dataset.option]}",`;
		}
	}
	for (let ul of document.querySelectorAll('.specimen-glyphs-letterset-category ul')) {
		ul.style.fontFeatureSettings = options.slice(0, -1); // remove last comma
	}
	glyphView.style.fontFeatureSettings = options.slice(0, -1); // remove last comma
}

refreshDropdownListeners();