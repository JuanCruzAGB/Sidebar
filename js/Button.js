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
        // TODO: If the html was not found, create it with HTMLCreatorJS
        this.setHTML(html);
        this.html.addEventListener("click", (e) => {
            Sidebar.switch(this.props.target);
        });
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
        let htmls = Button.querySelector(Sidebar.props.id);
        for (const key in htmls) {
            if (Object.hasOwnProperty.call(htmls, key)) {
                props.id = `link-${ key }`;
                buttons.push(new this({
                    props: {
                        id: `link-${ key }`,
                        target: htmls[key].hasAttribute("open"),
                    }, html: htmls[key],
                    Sidebar: Sidebar,
                }));
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