// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/**
 * * Sidebar makes an excellent sidebar.
 * @export
 * @class Sidebar
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 * @extends Class
 */
export class Sidebar extends Class {
    /**
     * * Creates an instance of Sidebar.
     * @param {object} [props] Sidebar properties:
     * @param {string} [props.id='sidebar-1'] Sidebar primary key.
     * @param {string} [props.position='left'] Sidebar position.
     * @param {object} [states] Sidebar states:
     * @param {boolean} [states.open=false] Sidebar open state.
     * @memberof Sidebar
     */
    constructor (props = {
        id: 'sidebar-1',
        position: 'left',
    }, states = {
        open: false,
    }) {
        super(props, states);
        if (document.querySelector(`#${ this.props.id }.sidebar`)) {
            this.setHTML(document.querySelector(`#${ this.props.id }.sidebar`));
        }
        this.setButtons();
        this.checkStates();
    }

    /**
     * * Check the Sidebar states values.
     * @memberof Sidebar
     */
    checkStates () {
        this.checkOpenState();
    }

    /**
     * * Check the Sidebar open state.
     * @memberof Dropdown
     */
     checkOpenState () {
        if (this.states.open) {
            this.switch();
        }
    }

    /**
     * * Set the opener & the closer buttons.
     * @memberof Sidebar
     */
    setButtons () {
        let sidebar = this;
        this.buttons = {
            open: [],
            close: [],
        };
        if (document.querySelectorAll(`.sidebar-button.open-btn.${ this.props.position }`).length) {
            for (const btn of document.querySelectorAll(`.sidebar-button.open-btn.${ this.props.position }`)) {
                if (btn.href.split('#').pop() === this.props.id) {
                    this.buttons.open.push(btn);
                    btn.addEventListener('click', function (e) {
                        e.preventDefault();
                        sidebar.switch();
                    });
                }
            }
        } else {
            console.warn(`There is not sidebar-${ this.props.position } open button`);
        }
        if (document.querySelectorAll(`.sidebar-button.close-btn.${ this.props.position }`).length) {
            for (const btn of document.querySelectorAll(`.sidebar-button.close-btn.${ this.props.position }`)) {
                this.buttons.close.push(btn);
                btn.addEventListener("click", function (e) {
                    e.preventDefault();
                    sidebar.switch();
                });
            }
        } else {
            console.warn(`There is not sidebar-${ this.props.position } close button`);
        }
        this.addEventToSidebarButtons();
    }

    /**
     * * Add the close event to the Sidebar custom buttons.
     * @memberof Sidebar
     */
    addEventToSidebarButtons () {
        let sidebar = this;
        let sidebarButtons = document.querySelectorAll(`#${ this.props.id } .sidebar-link.sidebar-button`);
        for (const btn of sidebarButtons) {
            btn.addEventListener('click', (e) => {
                sidebar.switch();
            });
        }
    }

    /**
     * * Switch the Sidebar open state.
     * @returns {boolean}
     * @memberof Sidebar
     */
    switch () {
        switch (this.states.open) {
            case true:
                this.close();
                return false;
            case false:
                this.open();
                return true;
        }
    }
    
	/**
     * * Open the Sidebar
     * @memberof Sidebar
     */
    open () {
        this.setStates('open', true);
        if (this.html.classList.contains('closed')) {
            this.html.classList.remove('closed');
        }
        this.html.classList.add('opened');
    }
    
    /**
     * * Close the Sidebar
     * @memberof Sidebar
     */
    close () {
        this.setStates('open', false);
        if (this.html.classList.contains('opened')) {
            this.html.classList.remove('opened');
        }
        this.html.classList.add('closed');
    }

    // static getPositions (props = {
    //     position: ['left', 'right'],
    // }) {
    //     if (typeof props.position != 'object') {
    //         throw new Error({
    //             status: 415,
    //             message: 'The Sidebar props position must be a valid object.',
    //             display: true,
    //         });
    //     }
    //     let positions = [];
    //     for(const position of props.position){
    //         positions.push(position);
    //     }
    //     return positions;
    // }
}

// ? Default export
export default Sidebar;