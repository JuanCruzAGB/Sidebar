// ? JuanCruzAGB | Source repository
import Class from '@juancruzagb/src';

// ? JuanCruzAGB | Sidebar repository
import { Button, } from "@juancruzagb/sidebar";

/**
 * * Sidebar makes an excellent sidebar.
 * @export
 * @class Sidebar
 * @author Juan Cruz Armentia <juan.cruz.armentia@gmail.com>
 * @extends Class
 */
export default class Sidebar extends Class {
    /**
     * * Creates an instance of Sidebar.
     * @param {object} [data]
     * @param {object} [data.callbacks]
     * @param {object} [data.callbacks.active]
     * @param {function} [data.callbacks.active.function]
     * @param {object} [data.callbacks.active.params={}]
     * @param {object} [data.callbacks.close]
     * @param {function} [data.callbacks.close.function]
     * @param {object} [data.callbacks.close.params={}]
     * @param {object} [data.callbacks.open]
     * @param {function} [data.callbacks.open.function]
     * @param {object} [data.callbacks.open.params={}]
     * @param {object} [data.callbacks.switch]
     * @param {function} [data.callbacks.switch.function]
     * @param {object} [data.callbacks.switch.params={}]
     * @param {object} [data.props]
     * @param {string} [data.props.id="sidebar-1"]
     * @param {object} [data.state]
     * @param {boolean} [data.state.open=false]
     * @param {object} [data.state.viewport]
     * @param {boolean} [data.state.viewport.425=false]
     * @param {boolean} [data.state.viewport.768=false]
     * @param {boolean} [data.state.viewport.1024=false]
     * @param {boolean} [data.state.viewport.1336=false]
     * @param {boolean} [data.state.viewport.1536=false]
     * @param {boolean} [data.state.viewport.1920=false]
     * @memberof Sidebar
     */
    constructor (data = {
        callbacks: {
            close: {
                function: params => { /* console.log(params); */ },
                params: {},
            },
            open: {
                function: params => { /* console.log(params); */ },
                params: {},
            },
            switch: {
                function: params => { /* console.log(params); */ },
                params: {},
            },
        },
        props: {
            id: "sidebar-1",
        },
        state: {
            open: false,
            viewport: {
                "425": false,
                "768": false,
                "1024": false,
                "1336": false,
                "1536": false,
                "1920": false,
            },
        },
    }) {
        super({
            callbacks: {
                ...Sidebar.callbacks(),
                ...(data && data.hasOwnProperty("callbacks")) ? data.callbacks : {},
            },
            props: {
                ...Sidebar.props(),
                ...(data && data.hasOwnProperty("props")) ? data.props : {},
            },
            state: {
                ...Sidebar.state(),
                ...(data && data.hasOwnProperty("state")) ? data.state : {},
            },
        });

        this.html = document.querySelector(`#${ this.props.id }.sidebar`);

        this.buttons = new Button;
        this.buttons.add(document.querySelectorAll(`.${ this.props.id }.button`), this);

        if (this.state.open) this.open();
    }

    /**
     * * Close the Sidebar.
     * @param {object} [params]
     * @memberof Sidebar
     */
    close (params = {}) {
        this.state.add("open", false);
        this.html.classList.remove("opened");

        if (this.callbacks.has("close")) {
            this.callbacks.execute("close", {
                ...params,
                open: this.state.open,
                Sidebar: this,
            });
        }
    }

    /**
     * * Open the Sidebar.
     * @param {object} [params]
     * @memberof Sidebar
     */
    open (params = {}) {
        this.state.add("open", true);
        this.html.classList.add("opened");

        if (this.callbacks.has("open")) {
            this.callbacks.execute("open", {
                ...params,
                open: this.state.open,
                Sidebar: this,
            });
        }
    }

    /**
     * * Switch the Sidebar open state.
     * @param {object} [params]
     * @returns {boolean}
     * @memberof Sidebar
     */
    switch (params = {}) {
        switch (this.state.open) {
            case true:
                this.close();
                break;

            case false:
                this.open();
                break;
        }

        if (this.callbacks.has("switch")) {
            this.callbacks.execute("switch", {
                ...params,
                open: this.state.open,
                Sidebar: this,
            });
        }

        return this.state.open;
    }

    /**
     * * Returns default callbacks.
     * @static
     * @returns {object}
     * @memberof Sidebar
     */
    static callbacks () {
        return {
            // 
        };
    }

    /**
     * * Returns default properties.
     * @static
     * @returns {object}
     * @memberof Sidebar
     */
    static props () {
        return {
            id: "sidebar-1",
        };
    }
    
    /**
     * * Returns default state.
     * @static
     * @returns {object}
     * @memberof Sidebar
     */
    static state () {
        return {
            open: false,
        };
    }
}