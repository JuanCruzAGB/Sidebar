// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/Class.js";

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
        let sidebars = document.querySelectorAll('.sidebar');
        if(sidebars.length){
            for(const sidebar of sidebars){
                if(sidebar.id == this.props.id){
                    this.setHTML(sidebar);
                }
            }
        }
        this.setButtons();
        this.checkOpenedSidebar();
    }

    /**
     * * Set the opener & the closer buttons.
     * @memberof Sidebar
     */
    setButtons () {
        let sidebar = this;
        this.btnsOpener = [];
        let btnsOpener = document.querySelectorAll(`.sidebar-button.open-btn.${ this.props.position }`);
        this.btnCloser = document.querySelector(`#${ this.props.id } .sidebar-button.close-btn`);
        for (const btn of btnsOpener) {
            if (btn.href.split('#').pop() == this.props.id) {
                this.btnsOpener.push(btn);
                btn.addEventListener('click', (e) => {
                    if(btn.classList.contains('sidebar-button')){
                        e.preventDefault();
                    }
                    sidebar.switch();
                });
            }
        }
        this.btnCloser.addEventListener("click", (e) => {
            e.preventDefault();
            sidebar.switch();
        });
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

    /**
     * * Check if should be a current Dropdown open.
     * @memberof Dropdown
     */
    checkOpenedSidebar () {
        if (this.states.open) {
            this.switch();
        }
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