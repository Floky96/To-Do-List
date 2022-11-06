'use strict'

class MasterClass {
    constructor() {
        this.tabLibrary = [];
        this.cardLibrary = [];
        this.dummy = [];
    }

    //------------------------Helper Fucntions

    toggleTabCreationUi = () => {
        const target = document.getElementById("container-create-tab-ui");
        target.classList.remove('hide-element-class');
        const cancelBtn = document.getElementById("create-tab-btn-x");
        cancelBtn.addEventListener("click", this.closeTabContainer);
        const createBtn = document.getElementById("create-tab-btn-create");
        createBtn.addEventListener("click", this.createTab);
    }

    closeTabContainer = () => {
        const clearInput = document.getElementById("create-tab-input-title");
        clearInput.value = "";
        const target = document.getElementById("container-create-tab-ui");
        target.classList.add('hide-element-class');
    }

    hideEditTabUi = () => {
        const backgroundBlur = document.getElementById("container-edit-tab-ui");
        backgroundBlur.classList.add('hide-element-class');
        this.dummy = [];
    }

    hideEditCardUi = () => {
        const backgroundBlur = document.getElementById("container-edit-card-ui");
        backgroundBlur.classList.add('hide-element-class');
        this.dummy = [];
    }

    toggleCardCreationUi = () => {
        const target = document.getElementById("container-create-card-ui");
        target.classList.remove('hide-element-class');
        const cancelBtn = document.getElementById("create-card-btn-x");
        cancelBtn.addEventListener("click", this.closeCardContainer);
        const createBtn = document.getElementById("create-card-btn-create");
        createBtn.addEventListener("click", this.createCard);
    }

    closeCardContainer = () => {
        let toClear = document.getElementById("create-card-input-title");
        toClear.value !== null ? toClear.value = null : toClear.value = null;
        toClear = document.getElementById("prio-dropdown-list");
        toClear.value !== null ? toClear.value = "prio-1" : toClear.value = "prio-1";
        toClear = document.getElementById("create-card-input-date");
        toClear.value !== null ? toClear.value = null : toClear.value = null;
        toClear = document.getElementById("create-card-task-description");;
        toClear.value !== null ? toClear.value = null : toClear.value = null;
        toClear = document.getElementById("create-card-checkmark");
        toClear.checked = false;

        const target = document.getElementById("container-create-card-ui");
        target.classList.add('hide-element-class');
    }

    createHtmlElement = (elementType, addClass, addId) => {
        const newElement = document.createElement(elementType);
        addClass !== 0 ? newElement.classList.add(addClass) : newElement.classList.add("noClass");
        addId !== 0 ? newElement.id = addId : newElement.id = "noId";
        return newElement;
    }

    appendNewElementANDoptionalText = (targetedParentId, element, addTextContent) => {
        const target = document.getElementById(targetedParentId);
        target.appendChild(element);
        addTextContent !== 0 ? element.textContent = addTextContent : element.textContent = "";
    }

    findActiveTab = () => {
        let parentTab = "";
        this.tabLibrary.forEach(element => {
            element.active == true ? parentTab = element : null;
        });
        return parentTab;
    }

    unselectTab = () => {
        this.tabLibrary.forEach(element => {
            element.active = false;
        });
    }

    clearCardLibraryHTML = () => {
        document.getElementById("library-cards").innerHTML = "";
    }

    displayActiveTabCards = () => {
        const cardLibrary = document.getElementById("library-cards");
        let cardContent = [];
        this.cardLibrary.forEach(element => {
            element.parentTab.active == true ? cardContent.push(element.cardContent) : null;
        });

        cardContent.forEach(element => {
            cardLibrary.appendChild(element);
        });
    }

    switchActiveTab = (event) => {
        let target = event.target;
        if ((target.parentElement).classList == "created-tab-options") { return };
        target = (target.parentElement).id;
        this.clearCardLibraryHTML();

        this.tabLibrary.forEach(element => {
            element.id == target ? element.active = true : element.active = false;
        });
        let findActiveTab = "";
        let setActiveTabBorder = "";
        let dummy = "";
        this.tabLibrary.forEach(element => {
            dummy = document.getElementById(element.id);
            dummy !== null ? dummy.style.border = "" : null;
        })
        this.tabLibrary.forEach(element => {
            element.active == true ? findActiveTab = element.id : null;
        });
        setActiveTabBorder = document.getElementById(findActiveTab);
        setActiveTabBorder !== null ? setActiveTabBorder.style.border = "2px solid black" : null;

        this.displayActiveTabCards();
    }

    deleteTab = (event) => {
        const tabLibraryHTML = document.getElementById("library-tabs");
        const cardLibraryHTML = document.getElementById("library-cards");
        const createCardBtn = document.getElementById("create-card-btn");
        let target = (event.target).parentElement.parentElement;
        target.remove();
        this.cardLibrary.forEach(element => {
            target.id == element.parentTab.id && element.parentTab.active == true ? cardLibraryHTML.innerHTML = "" : null;
        });
        tabLibraryHTML.childElementCount == 0 ? cardLibraryHTML.innerHTML = "" : null;
        tabLibraryHTML.childElementCount == 0 ? createCardBtn.classList.add("hide-element-class") : null;
    }

    confirmNewTabTitle = () => {
        let newTitle = (document.getElementById("edit-tab-input-title")).value;
        let clearAfter = (document.getElementById("edit-tab-input-title"));
        let target = document.getElementById(this.dummy);
        newTitle == "" ? newTitle = "My Project" : null;
        target.textContent = newTitle;
        this.dummy = [];
        const backgroundBlur = document.getElementById("container-edit-tab-ui");
        backgroundBlur.classList.add('hide-element-class');
        clearAfter.value = null;
    }

    editTab = (event) => {
        let target = (event.target).parentElement.parentElement.firstChild.id;
        const backgroundBlur = document.getElementById("container-edit-tab-ui");
        const cancelBtn = document.getElementById("edit-tab-btn-x");
        const confirm = document.getElementById("edit-tab-btn-confirm");
        this.dummy.push(target);
        backgroundBlur.classList.remove('hide-element-class');
        cancelBtn.addEventListener("click", this.hideEditTabUi);
        confirm.addEventListener("click", this.confirmNewTabTitle);
    }

    deleteSingleCard = (event) => {
        let targetHTML = (event.target).parentElement.parentElement.parentElement;
        let targetObject = (event.target).parentElement.parentElement.parentElement.id;
        targetHTML.remove();
        this.cardLibrary.forEach(element => {
            element.cardId == targetObject ? element.parentId = "archive" : null;
            element.cardId == targetObject ? element.parentTab = "archive" : null;
        })
    }

    confirmCardEdit = () => {
        let target = String(this.dummy);
        let idCount = "";
        for (let i = 0; i <= target.length; i++) {
            target[i] % 1 <= 0 ? idCount += target[i] : null;
        }
        let oldTitle = document.getElementById("created-card-title-" + idCount);
        let oldPrio = document.getElementById("created-card-title-" + idCount);
        let oldDate = document.getElementById("created-card-picked-date-" + idCount);
        let oldTask = "";
        let newTitle = document.getElementById("edit-card-input-title").value;
        let newPrio = document.getElementById("prio-dropdown-list-edit").value;
        let newDate = document.getElementById("edit-card-input-date").value;
        let newTask = document.getElementById("edit-card-task-description").value;
        document.getElementById("created-card-created-task_default-text-" + idCount) !== null ? oldTask = document.getElementById("created-card-created-task_default-text-" + idCount) : null;
        document.getElementById("created-card-task-description-" + idCount) !== null ? oldTask = document.getElementById("created-card-task-description-" + idCount) : null;
        newTitle == "" ? newTitle = oldTitle.textContent : null;
        oldTitle.textContent = newTitle;
        oldPrio.className = newPrio;
        newDate == "" ? newDate = oldDate.textContent : null;
        oldDate.textContent = newDate;
        oldDate.textContent !== "1996-06-04" ? oldDate.parentElement.classList.remove('hide-element-class') : null;
        newTask == "" ? newTask = oldTask.textContent : null;
        oldTask.textContent = newTask;
        this.hideEditCardUi();
    }

    editCardUi = (event) => {
        let backgroundBlur = document.getElementById("container-edit-card-ui");
        let cancelBtn = document.getElementById("edit-card-btn-x");
        let confirm = document.getElementById("edit-card-btn-create");
        let target = event.target.parentElement.parentElement.parentElement;
        this.dummy.push(target.id);
        backgroundBlur.classList.remove('hide-element-class');

        let clearInput = document.getElementById("edit-card-input-title");
        clearInput.value = null;
        clearInput = document.getElementById("prio-dropdown-list-edit");
        clearInput.value = "prio-1";
        clearInput = document.getElementById("edit-card-input-date");
        clearInput.value = null;
        clearInput = document.getElementById("edit-card-task-description");
        clearInput.value = null;

        cancelBtn.addEventListener("click", this.hideEditCardUi);
        confirm.addEventListener("click", this.confirmCardEdit);
    }

    //-------------------------Create TAB

    createTab = () => {
        this.clearCardLibraryHTML();

        const userInputTitle = document.getElementById("create-tab-input-title");
        const createBtn = document.getElementById("container-create-tab-ui");
        let parentId = document.getElementById("library-tabs");
        let count = 0;
        this.tabLibrary.forEach(element => {
            count++
        });
        parentId = "library-tabs";
        let newChildId = "created-tab-" + count;
        let tabNumber = "created-tab-" + count;

        let newElement = this.createHtmlElement('div', 'created-tab', newChildId);
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        let setActiveBorder = document.getElementById(newChildId);
        parentId = newChildId;
        newChildId = "created-tab-paragraph-" + count;

        let catchNoTitle = String(userInputTitle.value);
        catchNoTitle == "" ? catchNoTitle = "My Project" : null;
        newElement = this.createHtmlElement('p', 0, newChildId);
        this.appendNewElementANDoptionalText(parentId, newElement, catchNoTitle);
        parentId = "created-tab-" + count;
        newChildId = "created-tab-div-" + count;

        newElement = this.createHtmlElement('div', 'created-tab-options', newChildId);
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        parentId = newChildId;
        newChildId = "editTabBtn-" + count;

        newElement = this.createHtmlElement('i', 'fa-solid', 0);
        newElement.classList.add("fa-check");
        newElement.classList.add('hide-element-class');
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        newChildId = "confirmTabEditBtn" + count;

        newElement = this.createHtmlElement('i', 'fa-solid', 0);
        newElement.classList.add("fa-x");
        newElement.classList.add('hide-element-class');
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        newChildId = "editTabBtn-" + count;

        newElement = this.createHtmlElement('i', 'fa-solid', newChildId);
        newElement.classList.add("fa-pencil");
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        let editTab = document.getElementById(newChildId);
        editTab.addEventListener("click", this.editTab);
        newChildId = "deleteTabBtn-" + count;

        newElement = this.createHtmlElement('i', 'fa-solid', newChildId);
        newElement.classList.add("fa-trash");
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        let deleteTab = document.getElementById(newChildId);
        deleteTab.addEventListener("click", this.deleteTab);

        createBtn.classList.add('hide-element-class');

        let showAddCardBtn = document.getElementById("create-card-btn");
        showAddCardBtn.classList.remove("hide-element-class");

        let createdTabSwitchActive = document.getElementById(tabNumber);
        createdTabSwitchActive.addEventListener("click", this.switchActiveTab);

        this.unselectTab()

        let tab = {
            id: tabNumber,
            active: true
        };
        this.tabLibrary.push(tab);
        userInputTitle.value = "";
        let dummy = "";
        this.tabLibrary.forEach(element => {
            dummy = document.getElementById(element.id);
            dummy !== null ? dummy.style.border = "" : null;
        })
        setActiveBorder.style.border = "2px solid black";
    }

    //---------------------------Create CARD

    createCard = () => {
        let userInputTitle = document.getElementById("create-card-input-title");
        let userInputPrio = document.getElementById("prio-dropdown-list");
        let userInputDate = document.getElementById("create-card-input-date");
        let userInputTask = document.getElementById("create-card-task-description");
        let userInputChecked = document.getElementById("create-card-checkmark");
        let parentId = document.getElementById("library-cards");
        let count = 0;
        let parentTab = this.findActiveTab();
        let skip = false;
        this.cardLibrary.forEach(element => {
            count++
        });
        parentId = "library-cards";
        let newChildId = "created-card-" + count;
        let cardNumber = count;
        let newElement = this.createHtmlElement('div', 'created-card', newChildId);
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        parentId = newChildId;
        newChildId = "created-card-options-" + count;
        newElement = this.createHtmlElement('div', "created-card-options", newChildId);
        this.appendNewElementANDoptionalText(parentId, newElement, 0);

        parentId = newChildId;
        newChildId = "created-card-title-" + count;
        newElement = this.createHtmlElement('p', 0, newChildId);
        newElement.classList.add(userInputPrio.value);
        let catchNoTitle = userInputTitle.value;
        catchNoTitle == "" ? catchNoTitle = "My Task" : null;
        catchNoTitle == "Your Title" ? catchNoTitle = "My Task" : null;
        this.appendNewElementANDoptionalText(parentId, newElement, catchNoTitle);

        parentId = "created-card-" + cardNumber;
        newChildId = "created-card-content-" + count;
        newElement = this.createHtmlElement('div', "created-card-content", newChildId);
        this.appendNewElementANDoptionalText(parentId, newElement, 0);

        parentId = newChildId;
        newChildId = "created-card-created-date-" + count;
        newElement = this.createHtmlElement('div', "created-card-created-date", newChildId);
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        parentId = newChildId;
        userInputDate.value == "" ? userInputDate.value = ("1996-06-04") : userInputDate.classList.remove('hide-element-class');
        
        newElement = this.createHtmlElement('i', 'fa-light', 0);
        newElement.classList.add("fa-calendar-days");
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        newChildId = "created-card-picked-date-" + count;
        newElement = this.createHtmlElement('span', "created-card-picked_date", newChildId);
        this.appendNewElementANDoptionalText(parentId, newElement, userInputDate.value);
        let hidenodate = document.getElementById("created-card-created-date-" + count);
        (hidenodate.lastChild).textContent == "1996-06-04" ? hidenodate.classList.add('hide-element-class') : hidenodate.classList.remove('hide-element-class');

        if (userInputChecked.checked == false) {
            parentId = "created-card-content-" + count;
            newChildId = "created-card-created-task_default-" + count;
            newElement = this.createHtmlElement('span', "created-card-created-task_default", newChildId);
            this.appendNewElementANDoptionalText(parentId, newElement, 0);

            parentId = newChildId;
            newChildId = "created-card-created-task_default-text-" + count;
            newElement = this.createHtmlElement('p', "created-card-created-task-description", newChildId);
            this.appendNewElementANDoptionalText(parentId, newElement, userInputTask.value);
        }
        userInputTask.value == "" ? skip = true : null;
        if (userInputChecked.checked == true) {
            parentId = "created-card-content-" + count;
            newChildId = "created-card-created-task_withToggle-" + count;
            const idHolder = newChildId
            newElement = this.createHtmlElement('span', "created-card-created-task_withToggle", newChildId);
            this.appendNewElementANDoptionalText(parentId, newElement, 0);

            parentId = newChildId;
            newChildId = "container-checkBox-" + count;
            newElement = this.createHtmlElement('label', "container-checkBox", newChildId);
            this.appendNewElementANDoptionalText(parentId, newElement, 0);
            let holder = document.getElementById(newChildId);
            skip == true ? holder.classList.add('hide-element-class') : null;

            parentId = newChildId;
            newChildId = "container-checkBox-inside-a-" + count;
            newElement = this.createHtmlElement('input', 0, newChildId);
            newElement.type = "checkbox";
            this.appendNewElementANDoptionalText(parentId, newElement, 0);

            newChildId = "created-card-checkmark-" + count;
            newElement = this.createHtmlElement('span', "checkmark", newChildId);
            newElement.type = "checkbox";
            this.appendNewElementANDoptionalText(parentId, newElement, 0);

            parentId = idHolder;
            newChildId = "created-card-task-description-" + count;
            newElement = this.createHtmlElement('p', 0, newChildId);
            this.appendNewElementANDoptionalText(parentId, newElement, userInputTask.value);
        }
        parentId = "created-card-" + cardNumber;
        newChildId = "created-card-edit_save-" + count;
        newElement = this.createHtmlElement('div', "created-card-edit_save", newChildId);
        this.appendNewElementANDoptionalText(parentId, newElement, 0);

        parentId = "created-card-edit_save-" + count;
        newChildId = "created-card-edit_save-span-" + count;
        newElement = this.createHtmlElement('span', 0, newChildId);
        this.appendNewElementANDoptionalText(parentId, newElement, 0);

        parentId = newChildId;
        newChildId = "edit-card-btn-" + count;
        newElement = this.createHtmlElement('i', "fa-regular", newChildId);
        newElement.classList.add("fa-pencil");
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        let editCard = document.getElementById(newChildId);
        editCard.addEventListener("click", this.editCardUi);

        newChildId = "remove-card-btn-" + count;
        newElement = this.createHtmlElement('i', "fa-regular", newChildId);
        newElement.classList.add("fa-trash");
        this.appendNewElementANDoptionalText(parentId, newElement, 0);
        let deleteCard = document.getElementById(newChildId);
        deleteCard.addEventListener("click", this.deleteSingleCard);

        const target = document.getElementById("container-create-card-ui");
        target.classList.add('hide-element-class');

        let cardId = "created-card-" + cardNumber;
        let cardContent = document.getElementById("created-card-" + cardNumber);
        let card = {
            parentTab,
            cardId,
            cardContent
        };
        this.cardLibrary.push(card);

        userInputTitle.value = null;
        userInputPrio.value = "prio-1";
        userInputDate.value = null;
        userInputTask.value = null;
        userInputChecked.checked = false;
    }

    //------------------------------Add Eventlisteners to main buttons

    listen = () => {
        const tabTarget = document.getElementById("create-tab-btn");
        tabTarget.addEventListener("click", this.toggleTabCreationUi);

        const cardTarget = document.getElementById("create-card-btn");
        cardTarget.addEventListener("click", this.toggleCardCreationUi);
    }
}

let main = new MasterClass();
main.listen();
