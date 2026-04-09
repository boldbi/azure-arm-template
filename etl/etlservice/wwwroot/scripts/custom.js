// wwwroot/scripts/custom.js
let dotnetHelper;

window.registerCurrentSection = function(dotnetObjRef){
        dotnetHelper = dotnetObjRef;
}

window.clearTokenFromUrl = function (removeText) {
    // Convert removeText to a string
    removeText = removeText.toString();

    // Create a regular expression to match the token in the URL
    var regex = new RegExp('/' + removeText, 'g');

    // Get the current URL
    var currentUrl = window.location.href;

    // Clear the token from the URL
    var newUrl = currentUrl.replace(regex, '');

    // Replace the URL without the token
    history.replaceState({}, document.title, newUrl);
}

window.copyToClipboard1 = {
    writeText: function (text) {
        // Create a textarea element to hold the text
        var textarea = document.createElement("textarea");
        textarea.value = text;

        // Append the textarea to the document
        document.body.appendChild(textarea);

        // Select and copy the text
        textarea.select();
        document.execCommand("copy");

        // Remove the textarea from the document
        document.body.removeChild(textarea);
    }
};

window.showDeleteIcon = function (elementName, projects) {
    var currentProj = document.getElementById("projectName_" + elementName);
    var delIcon = document.getElementById("deleteProj_" + elementName);
    if (currentProj) {
        if (currentProj.style.display == 'flex') {
            delIcon.style.display = 'block';
        }
    }
}

window.hideDeleteIcon = function (elementName) {
    var currentProj = document.getElementById("projectName_" + elementName);
    var delIcon = document.getElementById("deleteProj_" + elementName);
    if (currentProj) {
        delIcon.style.display = 'none';
        //if (currentProj.style.display == 'flex') {
        //    delIcon.style.display = 'none';
        //}
    }
}

window.cancelDelete = function (elementName) {
    var confirmDeleteEle = document.getElementById("confirmDelete_" + elementName);
    var currentProj = document.getElementById("projectName_" + elementName);
    if (currentProj) {
        currentProj.style.display = 'flex';
        confirmDeleteEle.style.visibility = 'hidden';
        confirmDeleteEle.style.left = '-100%';
        confirmDeleteEle.style.position = 'absolute';
    }
}

window.showElementById = function (elementName, projects) {
    for (var item in projects) {
        var confirmDeleteEle = document.getElementById("confirmDelete_" + projects[item]);
        var currentProj = document.getElementById("projectName_" + projects[item])
        var delIcon = document.getElementById("deleteProj_" + projects[item]);
        if (projects[item] == elementName) {
            if (currentProj) {
                currentProj.style.display = 'none';
            }
            if (confirmDeleteEle) {
                confirmDeleteEle.style.visibility = 'visible';
                confirmDeleteEle.style.left = '8px';
                confirmDeleteEle.style.position = 'relative';
            }
        } else {
            if (currentProj) {
                currentProj.style.display = 'flex';
            }
            if (confirmDeleteEle) {
                confirmDeleteEle.style.visibility = 'hidden';
                confirmDeleteEle.style.left = '-100%';
                confirmDeleteEle.style.position = 'absolute';
            }
        }
    }

    //var confirmDeleteEle = document.getElementById("confirmDelete_" + elementName);
    //var currentProj = document.getElementById("projectName_" + elementName)
    //if(currentProj)
    //{
    //    currentProj.style.display = 'none';
    //}
    //if (confirmDeleteEle) {
    //    confirmDeleteEle.style.left = '0';
    //    confirmDeleteEle.style.position = 'relative';
    //}
}

window.hideConfirmDelAlrt = function (parentID) {
    document.addEventListener('click', function (event) {
        var currentele = event.target;
        var isClosest = currentele.closest(parentID);
        if (isClosest == null) {
            var parent = document.getElementById(parentID);
            if(parent != null)
            {
                parent.querySelectorAll("div[id^='confirmDelete_']").forEach(function (div) {
                    div.style.visibility = 'hidden';
                    div.style.left = '-100%';
                    div.style.position = 'absolute';
                });
                parent.querySelectorAll("div[id^='projectName_']").forEach(function (div) {
                    div.style.display = 'flex';
                });
            }
        }
    });
}
window.addClickEventToGridColumns = (grid) => {
    const gridElement = document.querySelector(`#${grid.element.id}`);
    gridElement.querySelectorAll(".e-headercell").forEach(headerCell => {
        headerCell.addEventListener("click", (event) => {
            const columnName = event.target.getAttribute("aria-label");
            console.log("Clicked column: " + columnName);
        });
    });
}

window.addOutsideClickListener = () => {
    document.addEventListener('click', function (event) {
        var dropdownButton = document.getElementById('transformDropdownButton');
        var dropdownMenu = document.getElementById('actionDropdownList');
        var targetElement = event.target;
        if(dropdownButton && dropdownMenu) {
            if (!dropdownButton.contains(targetElement) && !dropdownMenu.contains(targetElement)) {
                // Clicked outside the dropdown button and dropdown menu, close the dropdown
                dropdownMenu.style.display = 'none';
            }
        }
        var dropdownmenu = document.getElementById('dropdown-menu options')
        if(dropdownmenu)
        {
            if(!dropdownmenu.contains(targetElement))
            {
                dropdownmenu.style.display = 'none';
            }
        }
    });
};

window.getComputedStyleValue = function (elementId, propertyName) {
    var element = document.getElementById(elementId);
    var computedStyle = window.getComputedStyle(element);
    var value = computedStyle.getPropertyValue(propertyName);
    if (value == 'none') {
        element.style.display = 'block'
    }
    else {
        element.style.display = 'none'

    }
};

window.openAuthWindow = function (authenticationUrl, width, height) {
    return new Promise((resolve, reject) => {
        let left = (screen.width - width) / 2;
        let top = (screen.height - height) / 2;
        let features = `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`;

        let authWindow = window.open(authenticationUrl, '_blank', features);

        if (!authWindow) {
            reject(new Error("Popup blocked by browser"));
            return;
        }

        let interval = setInterval(() => {
            try {
                if (!authWindow || authWindow.closed) {
                    clearInterval(interval);
                    reject(new Error("Authentication window closed before completion."));
                    return;
                }
                
                let url = authWindow.location.href;
                if (url.includes("code=")) {
                    let params = new URLSearchParams(url.split('?')[1]);
                    let authCode = params.get("code");

                    if (authCode) {
                        console.log(authCode);
                        clearInterval(interval);
                        authWindow.close();
                        resolve(authCode);
                        
                    }
                }
            } catch (e) {
                console.log(e.message);
            }
        }, 1000);
    });
};


window.EscapeClick = function () {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            let element = document.getElementById('hideAddProject');
            let element1 = document.getElementById('projectInput');
            if (element && element1) {
                element.style.display = 'block';
                element1.style.display = 'none';
            }
        }
});
};

window.projectopen = () => {
    let element = document.getElementById('hideAddProject');
    let element1 = document.getElementById('projectInput');
    if (element && element1) {
        element.style.display = 'none';
        element1.style.display = 'flex';
    }
}

window.scheduleClickListeners = {};

window.addOutsideClickListenerSchedule = (dotNetObj, id) => {
    const handleClickOutside = (event) => {
        let schedule = document.getElementById(`schedule-dropdown-${id}`);
        let targetElement = event.target;
        if (schedule && !schedule.contains(targetElement)) {
            dotNetObj.invokeMethodAsync('CloseDropdown');
            document.removeEventListener('click', window.scheduleClickListeners[id]);
            delete window.scheduleClickListeners[id];  
        }
    };

    
    window.scheduleClickListeners[id] = handleClickOutside;

    document.addEventListener('click', handleClickOutside);
};

window.removeOutsideClickListenerSchedule = (id) => {
    if (window.scheduleClickListeners[id]) {
        document.removeEventListener('click', window.scheduleClickListeners[id]);
        delete window.scheduleClickListeners[id];  // Clean up reference
    }
};

window.setActiveNavItem = function(navId) {
    var element = document.getElementById(navId);
    element.parentElement.querySelectorAll(".nav-item a").forEach(link => link.classList.remove("active"));
    
    const targetLink = document.querySelector(`#${navId} a`);

    if (targetLink && !targetLink.classList.contains("active")) {
        targetLink.classList.add("active");
    }
}

window.addOutsideClickListenerForHelpIcon = (elementId, dotNetObj) => {
    function handleClick(event) {
        const dropdown = document.getElementById(elementId);
        const helpLinkAnchorTag = dropdown?.querySelectorAll("a");
        if (dropdown && !dropdown.contains(event.target)) {
            dotNetObj.invokeMethodAsync('CloseHelpDropdown', elementId);
        }
        if(helpLinkAnchorTag && helpLinkAnchorTag[0] === event.target)
        {
            dotNetObj.invokeMethodAsync('CloseHelpDropdown', elementId);
        }
    }

    document.addEventListener('click', handleClick);

    // Clean up the event listener
    return {
        dispose: () => document.removeEventListener('click', handleClick)
    };
};

window.inputfileclick = () => {
    var element =   document.getElementById('file-input-bigquery');
    if (element) {
        element.click();

    }
}

window.ClosePipelinePanel = () => {
    if (dotnetHelper) {
        dotnetHelper.invokeMethodAsync("UpdateCurrentSection", 'settings-nav');
    }

}
