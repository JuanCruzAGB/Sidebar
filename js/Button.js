// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/**
 * * Button controls the Sidebar Buttons.
 * @export
 * @class Button
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export default class Button extends Class {
    /**
     * * Creates an instance of Button.
     * @param {object} [data]
     * @param {object} [data.props]
     * @param {string} [data.props.id="button-1"] Button primary key.
     * @param {boolean} [data.props.target=true]
     * @param {string} html Button HTML Element.
     * @param {Sidebar} Sidebar Button Sidebar parent.
     * @memberof Button
     */
    constructor (data = {
        props: {
            id: "button-1",
            target: true,
        }, html, Sidebar,
    }) {
        super({ ...Button.props, ...((data && data.hasOwnProperty("props")) ? data.props : {}) });
        this.setHTMLs([ data.html ], data.Sidebar);
    }

    /**
     * * Set the Button HTML Elements.
     * @param {HTMLElement[]} htmls
     * @param {Sidebar} Sidebar Button Sidebar parent.
     * @memberof Button
     */
    setHTMLs (htmls = [], Sidebar) {
        if (!this.htmls) {
            this.htmls = [];
        }
        for (const html of htmls) {
            html.addEventListener("click", (e) => {
                Sidebar.switch(this.props.target);
            })
            this.htmls.push(html);
        }
    }

    /**
     * * Returns all the Sidebar Buttons.
     * @static
     * @param {Sidebar} Sidebar
     * @returns {Button[]}
     * @memberof Button
     */
    static generate (Sidebar) {
        let buttons = [];
        let htmls = this.querySelector(Sidebar.props.id);
        for (const key in htmls) {
            if (Object.hasOwnProperty.call(htmls, key)) {
                let found = false;
                for (const button of buttons) {
                    if (button.props.target == htmls[key].classList.contains("open")) {
                        button.setHTMLs([htmls[key]], Sidebar);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    buttons.push(new this({
                        props: {
                            id: `link-${ key }`,
                            target: htmls[key].classList.contains("open"),
                        }, html: htmls[key],
                        Sidebar: Sidebar,
                    }));
                }
            }
        }
        return buttons;
    }

    /**
     * * Returns all the Sidebar Buttons HTMLElements.
     * @static
     * @param {string} id Sidebar primary key.
     * @returns {HTMLElement[]}
     * @memberof Button
     */
    static querySelector (id = false) {
        if (id) {
            return document.querySelectorAll(`.${ id }.sidebar-button`);
        }
        if (!id) {
            console.error("ID param is required to get the Sidebar Buttons");
            return [];
        }
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: "button-1",
        target: true,
    }
}