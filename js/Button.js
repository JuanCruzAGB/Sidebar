// ? JuanCruzAGB repository
import Class from '@juancruzagb/src';

/**
 * * Button controls the tab button.
 * @export
 * @class Button
 * @extends {Class}
 * @author Juan Cruz Armentia <juan.cruz.armentia@gmail.com>
 */
export class Button extends Class {
    /**
     * * Creates an instance of Button.
     * @param {object} [data]
     * @param {HTMLElement} [data.html]
     * @param {object} [data.props]
     * @param {string} [data.props.id='button-1'] Button primary key.
     * @param {string} [data.props.target=undefined]
     * @param {Sidebar} [data.Sidebar]
     * @memberof Button
     */
    constructor (data = {
        html,
        props: {
            id: 'button-1',
            target: false,
        },
        Sidebar,
    }) {
        super({
            props: {
                ...Button.props(),
                ...(data && data.hasOwnProperty("props")) ? data.props : {},
            },
        });

        this.setHTMLs([ data.html, ], data.Sidebar);
    }

    /**
     * * Set the Button HTML Elements.
     * @param {HTMLElement[]} htmls
     * @param {Sidebar} Sidebar Button Sidebar parent.
     * @memberof Button
     */
    setHTMLs (htmls = [], Sidebar) {
        if (!this.htmls) this.htmls = [];

        for (const html of htmls) {
            html.addEventListener('click', e => {
                if (this.props.target) Sidebar.open();
                else Sidebar.close();
            });

            this.htmls.push(html);
        }
    }

    /**
     * * Default properties.
     * @static
     * @returns {object}
     */
    static props () {
        return {
            id: 'button-1',
            target: false,
        };
    }
}

/**
 * * Controls the Button methods.
 * @export
 * @class Methods
 * @author JuanCruzAGB <juan.cruz.armentia@gmail.com>
 */
export default class Methods {
    /**
     * * Creates an instance of Methods.
     * @memberof Methods
     */
    constructor () {
        this.list = [];
    }

    /**
     * * Add a Button.
     * @param {array|object} data
     * @param {Sidebar} [Sidebar=false]
     * @throws {Error}
     * @returns
     * @memberof Methods
     */
    add (btn, Sidebar = false) {
        if (Sidebar) this.Sidebar = Sidebar;

        if (!btn) throw new Error('Button is required');

        if (Array.isArray(btn) || btn instanceof NodeList) {
            for (const btnInside of btn) this.add(btnInside);

            return;
        }

        this.list.push(new Button({
            html: btn,
            props: {
                id: `button-${ this.list.length + 1 }`,
                target: btn.classList.contains('open'),
            },
            Sidebar: this.Sidebar,
        }));
    }

    /**
     * * Returns a Button.
     * @param {string} target
     * @throws {Error}
     * @returns {array}
     * @memberof Methods
     */
    get (target) {
        if (!target) throw new Error('Sidebar Button target is required');

        if (!target instanceof String) throw new Error('Sidebar Button target must be a string');

        if (!this.has(target)) return undefined;

        let btns = [];

        for (const btn of this.list) {
            if (btn.props.target == target) btns.push(btn);
        }

        return btns;
    }

    /**
     * * Check if there is a Button.
     * @param {array|string} target
     * @throws {Error}
     * @returns {boolean}
     * @memberof Methods
     */
    has (target) {
        if (target == undefined) throw new Error('Sidebar Button target is required');

        if (Array.isArray(target)) {
            for (const btnTarget of target) {
                if (!this.has(btnTarget)) return false;
            }

            return true;
        }

        if (!target instanceof String) throw new Error('Sidebar Button target must be a string');

        for (const btn of this.list) {
            if (btn.props.target == target) return true;
        }

        return false;
    }

    /**
     * * Remove a Button.
     * @param {string} name
     * @throws {Error}
     * @memberof Methods
     */
    remove (name) {
        console.warn('Remove Sidebar Button is not supported yet');
    }
}