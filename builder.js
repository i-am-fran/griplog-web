// URL Builder - Live Generation
console.log('URL Builder script loaded - Version: 2025-01-15 17:00');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');

    const resultContainer = document.getElementById('resultContainer');
    const resultUrl = document.getElementById('resultUrl');
    const copyIconBtn = document.getElementById('copyIconBtn');
    const openBtn = document.getElementById('openBtn');
    const notificationToast = document.getElementById('notificationToast');

    if (!resultContainer || !resultUrl || !copyIconBtn || !openBtn || !notificationToast) {
        console.error('Required elements not found');
        return;
    }

    // Get all form inputs
    const gradeInput = document.getElementById('grade');
    const sportInput = document.getElementById('sport');

    // Grade options for each sport type
    const gradeOptions = {
        bouldering: ['3A', '3B', '3C', '4A', '4B', '4C', '5A', '5B', '5C', '6A', '6A+', '6B', '6B+', '6C', '6C+', '7A', '7A+', '7B', '7B+', '7C', '7C+', '8A', '8A+', '8B', '8B+', '8C', '8C+', '9A', '9A+', '9B', '9B+', '9C'],
        sport: ['3a', '3b', '3c', '4a', '4b', '4c', '5a', '5b', '5c', '6a', '6a+', '6b', '6b+', '6c', '6c+', '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a', '8a+', '8b', '8b+', '8c', '8c+', '9a', '9a+', '9b', '9b+', '9c'],
        dws: ['3A', '3B', '3C', '4A', '4B', '4C', '5A', '5B', '5C', '6A', '6A+', '6B', '6B+', '6C', '6C+', '7A', '7A+', '7B', '7B+', '7C', '7C+', '8A', '8A+', '8B', '8B+', '8C', '8C+', '9A', '9A+', '9B', '9B+', '9C']
    };

    // Populate grade dropdown based on sport
    function populateGrades(sport) {
        const grades = gradeOptions[sport] || [];
        const currentGrade = gradeInput.value;

        // Clear existing options
        gradeInput.innerHTML = '<option value="">Select grade</option>';

        // Add new options
        grades.forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.textContent = grade;
            gradeInput.appendChild(option);
        });

        // Restore selected grade if it's still valid
        if (currentGrade && grades.includes(currentGrade)) {
            gradeInput.value = currentGrade;
        }
    }

    // Initialize grades for default sport (bouldering)
    populateGrades(sportInput.value);

    // Update grades when sport changes
    sportInput.addEventListener('change', function() {
        populateGrades(this.value);
        generateURL();
    });
    const nameInput = document.getElementById('name');
    const locationInput = document.getElementById('location');
    const areaInput = document.getElementById('area');
    const heightInput = document.getElementById('height');
    const boltsInput = document.getElementById('bolts');
    const angleInput = document.getElementById('angle');
    const latInput = document.getElementById('lat');
    const lonInput = document.getElementById('lon');
    const xSuccessInput = document.getElementById('xSuccess');
    const xErrorInput = document.getElementById('xError');

    // Generate URL function
    function generateURL() {
        console.log('Generating URL...');

        const grade = gradeInput.value.trim();
        const sport = sportInput.value;

        // Only generate if required fields are filled
        if (!grade || !sport) {
            resultContainer.style.display = 'none';
            return;
        }

        // Build URL
        const params = [];
        params.push(`grade=${encodeURIComponent(grade)}`);
        params.push(`sport=${encodeURIComponent(sport)}`);

        // Optional fields - Route Information
        const name = nameInput.value.trim();
        if (name) params.push(`name=${encodeURIComponent(name)}`);

        const location = locationInput.value.trim();
        if (location) params.push(`location=${encodeURIComponent(location)}`);

        const area = areaInput.value.trim();
        if (area) params.push(`area=${encodeURIComponent(area)}`);

        // Optional fields - Route Characteristics
        const height = heightInput.value.trim();
        if (height) params.push(`height=${encodeURIComponent(height)}`);

        const bolts = boltsInput.value.trim();
        if (bolts) params.push(`bolts=${encodeURIComponent(bolts)}`);

        const angle = angleInput.value;
        if (angle) params.push(`angle=${encodeURIComponent(angle)}`);

        // Optional fields - GPS Coordinates
        const lat = latInput.value.trim();
        const lon = lonInput.value.trim();
        // Both lat and lon must be provided together
        if (lat && lon) {
            params.push(`lat=${encodeURIComponent(lat)}`);
            params.push(`lon=${encodeURIComponent(lon)}`);
        }

        // X-callback-url parameters
        const xSuccess = xSuccessInput.value.trim();
        const xError = xErrorInput.value.trim();

        if (xSuccess) params.push(`x-success=${encodeURIComponent(xSuccess)}`);
        if (xError) params.push(`x-error=${encodeURIComponent(xError)}`);

        // Always use x-callback-url format
        const url = `griplog://x-callback-url/import?${params.join('&')}`;

        // Show result
        resultUrl.textContent = url;
        resultContainer.style.display = 'block';
    }

    // Add input listeners to all fields
    const allInputs = [
        gradeInput, sportInput, nameInput, locationInput, areaInput,
        heightInput, boltsInput, angleInput, latInput, lonInput,
        xSuccessInput, xErrorInput
    ];

    allInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', generateURL);
            input.addEventListener('change', generateURL);
        }
    });

    // Copy icon button
    copyIconBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        copyToClipboard(resultUrl.textContent, copyIconBtn);
    });

    // Click URL field to copy
    resultUrl.addEventListener('click', function() {
        copyToClipboard(resultUrl.textContent, copyIconBtn);
    });

    // Open URL button
    openBtn.addEventListener('click', function() {
        const url = resultUrl.textContent;
        if (url) {
            window.location.href = url;
        }
    });

    // Copy to clipboard function
    function copyToClipboard(text, button) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showCopied(button);
            }).catch(() => {
                fallbackCopy(text, button);
            });
        } else {
            fallbackCopy(text, button);
        }
    }

    // Fallback copy method
    function fallbackCopy(text, button) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            showCopied(button);
        } catch (err) {
            console.error('Copy failed:', err);
        }

        document.body.removeChild(textarea);
    }

    // Show copied state
    function showCopied(button) {
        button.classList.add('copied');

        // Store original title if it's the icon button
        const originalTitle = button.getAttribute('title');
        if (originalTitle) {
            button.setAttribute('title', 'Copied!');
        }

        // Show notification toast
        showNotification();

        setTimeout(() => {
            button.classList.remove('copied');
            if (originalTitle) {
                button.setAttribute('title', originalTitle);
            }
        }, 2000);
    }

    // Show notification toast
    function showNotification() {
        notificationToast.classList.add('show');

        setTimeout(() => {
            notificationToast.classList.remove('show');
        }, 2500);
    }

    // Initial generation attempt
    generateURL();
});
