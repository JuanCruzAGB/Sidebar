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
     * @param {object} [data]
     * @param {object} [data.props]
     * @param {string} [data.props.id="sidebar-1"] Sidebar primary key.
     * @param {string} [data.props.position="left"] Sidebar position.
     * @param {object} [data.state]
     * @param {boolean} [data.state.open=false] If the Sidebar should be opened.
     * @param {object} [data.state.viewport={"1024":true}] The viewport where the Sidebar should be opened.
     * @param {object} [data.callbacks]
     * @param {object} [data.callbacks.close]
     * @param {function} [data.callbacks.close.function]
     * @param {object} [data.callbacks.close.params]
     * @param {object} [data.callbacks.open]
     * @param {function} [data.callbacks.open.function]
     * @param {object} [data.callbacks.open.params]
     * @memberof Sidebar
     */
    constructor (props = {
        id: "sidebar-1",
        position: "left",
    }, state = {
        open: false,
        viewport: {
            "425": false,
            "768": false,
            "1024": false,
            "1336": false,
            "1536": false,
            "1920": false,
    }}, callbacks = {
        close: {
            function: function (params) { /* console.log(params); */ },
            params: {},
        }, open: {
            function: function (params) { console.log(params); },
            params: {},
    }}) {
        super({ ...Sidebar.props, ...props }, { ...Sidebar.state, ...state });
        this.setCallbacks({ ...Sidebar.callbacks, ...callbacks });
        this.setHTML(document.querySelector(`#${ this.props.id }.sidebar`));
        this.setButtons();
        this.checkState();
    }

    /**
     * * Set the close & the open buttons buttons.
     * @memberof Sidebar
     */
    setButtons () {
        if (!this.buttons) {
            this.buttons = {
                open: [],
                close: [],
            };
        }
        for (const btn of Sidebar.openButtonQuerySelector(this.props.position)) {
            console.log([
                btn.href.split("#").pop(),
                this.props.id
            ]);
            if (btn.href.split("#").pop() == this.props.id) {
                this.buttons.open.push(btn);
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.switch();
                });
            }
        }
        for (const btn of Sidebar.closeButtonQuerySelector(this.props.position)) {
            if (btn.href.split("#").pop() == this.props.id) {
                this.buttons.close.push(btn);
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.switch();
                });
            }
        }
        this.addEventToSidebarButtons();
    }

    /**
     * * Check the Sidebar state values.
     * @memberof Sidebar
     */
    checkState () {
        this.checkOpenState();
    }

    /**
     * * Check the Sidebar open state.
     * @memberof Dropdown
     */
    checkOpenState () {
        if (this.state.open) {
            let open = true;
            if (this.state.hasOwnProperty("viewport")) {
                open = false;
                for (const width in this.state.viewport) {
                    if (Object.hasOwnProperty.call(this.state.viewport, width)) {
                        if (window.outerWidth >= width) {
                            open = this.state.viewport[width];
                        }
                    }
                }
            }
            switch (open) {
                case true:
                    this.open();
                    break;
                case false:
                    this.close();
                    break;
            }
        }
    }

    /**
     * * Add the close event to the Sidebar custom buttons.
     * @memberof Sidebar
     */
    addEventToSidebarButtons () {
        for (const btn of Sidebar.sidebarButtonQuerySelector(this.props.id)) {
            btn.addEventListener("click", (e) => {
                this.switch();
            });
        }
    }

    /**
     * * Switch the Sidebar open state.
     * @returns {boolean}
     * @memberof Sidebar
     */
    switch () {
        switch (this.state.open) {
            case true:
                this.close();
                return false;
            case false:
                this.open();
                return true;
        }
    }
    
    /**
     * * Close the Sidebar
     * @param {object} [params]
     * @memberof Sidebar
     */
    close (params = {}) {
        this.setState("open", false);
        this.html.classList.remove("opened");
        this.html.classList.add("closed");
        this.execute("close", {
            ...params,
            sidebar: this,
            open: this.state.open,
        });
    }
    
	/**
     * * Open the Sidebar
     * @param {object} [params]
     * @memberof Sidebar
     */
    open (params = {}) {
        this.setState("open", true);
        this.html.classList.remove("closed");
        this.html.classList.add("opened");
        this.execute("open", {
            ...params,
            sidebar: this,
            open: this.state.open,
        });
    }
    
    /**
     * * Returns all the Sidebar close Buttons.
     * @static
     * @param {string} position
     * @returns {HTMLElement[]}
     */
    static closeButtonQuerySelector (position) {
        return document.querySelectorAll(`.sidebar-button.close-btn.${ position }`);
    }
    
    /**
     * * Returns all the Sidebar open Buttons.
     * @static
     * @param {string} position
     * @returns {HTMLElement[]}
     */
    static openButtonQuerySelector (position) {
        return document.querySelectorAll(`.sidebar-button.open-btn.${ position }`);
    }
    
    /**
     * * Returns all the Sidebar Buttons.
     * @static
     * @param {string} id
     * @returns {HTMLElement[]}
     */
    static sidebarButtonQuerySelector (id) {
        return document.querySelectorAll(`#${ id } .sidebar-link.sidebar-button`);
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: "sidebar-1",
        position: "left",
    }
    
    /**
     * @static
     * @var {object} state Default state.
     */
    static state = {
        open: false,
    }
    
    /**
     * @static
     * @var {object} callbacks Default callbacks.
     */
    static callbacks = {
        close: {
            function: function (params) { /* console.log(params); */ },
            params: {},
        }, open: {
            function: function (params) { console.log(params); },
            params: {},
    }}
}

export default Sidebar;