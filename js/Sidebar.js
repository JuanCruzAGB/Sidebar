// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? Dropdown repository
import Button from "./Button.js";
import Link from "./Link.js";

/**
 * * Sidebar makes an excellent sidebar.
 * @export
 * @class Sidebar
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 * @extends Class
 */
export default class Sidebar extends Class {
    /**
     * * Creates an instance of Sidebar.
     * @param {object} [data]
     * @param {object} [data.props]
     * @param {string} [data.props.id="sidebar-1"] Sidebar primary key.
     * @param {object} [data.state]
     * @param {string} [data.state.current=false] Sidebar current Link state.
     * @param {boolean} [data.state.open=false] If the Sidebar should be opened.
     * @param {object} [data.state.viewport={"1024":true}] The viewport where the Sidebar should be opened.
     * @param {object} [data.callbacks]
     * @param {object} [data.callbacks.active]
     * @param {function} [data.callbacks.active.function]
     * @param {object} [data.callbacks.active.params]
     * @param {object} [data.callbacks.close]
     * @param {function} [data.callbacks.close.function]
     * @param {object} [data.callbacks.close.params]
     * @param {object} [data.callbacks.open]
     * @param {function} [data.callbacks.open.function]
     * @param {object} [data.callbacks.open.params]
     * @param {object} [data.callbacks.switch]
     * @param {function} [data.callbacks.switch.function]
     * @param {object} [data.callbacks.switch.params]
     * @memberof Sidebar
     */
    constructor (data = {
        props: {
            id: "sidebar-1",
        }, state: {
            current: false,
            open: false,
            viewport: {
                "425": false,
                "768": false,
                "1024": false,
                "1336": false,
                "1536": false,
                "1920": false,
            },
        }, callbacks: {
            active: {
                function: (params) => { /* console.log(params); */ },
                params: {},
            }, close: {
                function: (params) => { /* console.log(params); */ },
                params: {},
            }, open: {
                function: (params) => { /* console.log(params); */ },
                params: {},
            }, switch: {
                function: (params) => { /* console.log(params); */ },
                params: {},
            },
        },
    }) {
        super({ ...Sidebar.props, ...((data && data.hasOwnProperty("props")) ? data.props : {}) }, { ...Sidebar.state, ...((data && data.hasOwnProperty("state")) ? data.state : {}) });
        this.setCallbacks({ ...Sidebar.callbacks, ...((data && data.hasOwnProperty("callbacks")) ? data.callbacks : {}) });
        this.setHTML(`#${ this.props.id }.sidebar`);
        this.setButtons();
        this.setLinks();
        this.checkState();
    }

    /**
     * * Set the Sidebar Buttons.
     * @memberof Sidebar
     */
    setButtons () {
        this.buttons = Button.generate(this);
    }

    /**
     * * Set the Sidebar Links.
     * @memberof Sidebar
     */
    setLinks () {
        this.links = Link.generate(this);
    }

    /**
     * * Check the Sidebar state values.
     * @memberof Sidebar
     */
    checkState () {
        this.checkCurrentState();
        this.checkOpenState();
    }

    /**
     * * Check the NavMenu current state value.
     * @memberof NavMenu
     */
    checkCurrentState () {
        if (this.state.current) {
            this.active(this.state.current);
        }
    }

    /**
     * * Check the Sidebar open state.
     * @memberof Dropdown
     */
    checkOpenState () {
        // if (this.state.open) {
            if (this.state.hasOwnProperty("viewport")) {
                open = false;
                for (const width in this.state.viewport) {
                    if (Object.hasOwnProperty.call(this.state.viewport, width)) {
                        if (window.outerWidth >= width) {
                            open = this.state.viewport[width];
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
        // }
    }

    /**
     * * Change the Sidebar Link active.
     * @param {string} current
     * @param {object} params Active callback function params.
     * @returns {boolean}
     * @memberof Sidebar
     */
    active (current = false, params = {}) {
        if (current) {
            this.setState("current", current);
            let found = false;
            for (const link of this.links) {
                if (link.props.target == this.state.current) {
                    link.active();
                    found = link;
                }
                if (link.props.target != this.state.current) {
                    link.inactive();
                }
            }
            this.execute("active", {
                ...params,
                ...this.callbacks.active.params,
                current: current,
                link: found,
                Sidebar: this,
            });
            return found;
        }
        if (!current) {
            console.error("Current param is required to active a Link");
            return false;
        }
    }
    
    /**
     * * Close the Sidebar.
     * @param {object} [params]
     * @memberof Sidebar
     */
    close (params = {}) {
        this.setState("open", false);
        this.html.classList.remove("opened");
        this.execute("close", {
            ...params,
            ...this.callbacks.close.params,
            open: this.state.open,
            Sidebar: this,
        });
    }
    
	/**
     * * Open the Sidebar.
     * @param {object} [params]
     * @memberof Sidebar
     */
    open (params = {}) {
        this.setState("open", true);
        this.html.classList.add("opened");
        this.execute("open", {
            ...params,
            ...this.callbacks.open.params,
            open: this.state.open,
            Sidebar: this,
        });
    }

    /**
     * * Switch the Sidebar open state.
     * @returns {boolean}
     * @memberof Sidebar
     */
    switch (open = false, params = {}) {
        if (typeof open != "boolean") {
            console.error("Open param is required & should be a boolean, to switch the Sidebar");
            return false;
        }
        switch (open) {
            case true:
                this.open();
                break;
                case false:
                this.close();
                break;
        }
        this.execute("switch", {
            ...params,
            ...this.callbacks.switch.params,
            open: open,
            Sidebar: this,
        });
        return open;
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: "sidebar-1",
    }
    
    /**
     * @static
     * @var {object} state Default state.
     */
    static state = {
        current: false,
        // TODO: generate: false,
        open: false,
    }
    
    /**
     * @static
     * @var {object} callbacks Default callbacks.
     */
    static callbacks = {
        active: {
            function: (params) => { /* console.log(params); */ },
            params: {},
        }, close: {
            function: (params) => { /* console.log(params); */ },
            params: {},
        }, open: {
            function: (params) => { /* console.log(params); */ },
            params: {},
        }, switch: {
            function: (params) => { /* console.log(params); */ },
            params: {},
        },
    }

    /** 
     * @static
     * @var {Button} Button
     */
    static Button = Button

    /** 
     * @static
     * @var {Link} Link
     */
    static Link = Link
}