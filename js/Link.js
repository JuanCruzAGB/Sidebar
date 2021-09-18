// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/**
 * * Link controls the Sidebar Links.
 * @export
 * @class Link
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export default class Link extends Class {
    /**
     * * Creates an instance of Link.
     * @param {object} [data]
     * @param {object} [data.props]
     * @param {string} [data.props.id="link-1"] Link primary key.
     * @param {string} [data.props.target="#"]
     * @param {string} [data.props.type="link"]
     * @param {object} [data.state]
     * @param {boolean} [data.state.active=false] If the Link should be active.
     * @param {string} html Link HTML Element.
     * @param {Sidebar} Sidebar Link Sidebar parent.
     * @memberof Link
     */
    constructor (data = {
        props: {
            id: "link-1",
            target: "#",
            type: "link",
        }, state: {
            active: false,
        }, html, Sidebar,
    }) {
        super({ ...Link.props, ...((data && data.hasOwnProperty("props")) ? data.props : {}) }, { ...Link.state, ...((data && data.hasOwnProperty("state")) ? data.state : {}) });
        // TODO: If the html was not found, create it with HTMLCreatorJS
        this.setHTML(data.html);
        this.html.addEventListener("click", (e) => {
            if (this.props.type == "button") {
                e.preventDefault();
                Sidebar.switch(false);
            }
            Sidebar.active(this.props.target);
        });
        this.checkState();
    }

    /**
     * * Check the Link state values.
     * @memberof Link
     */
    checkState () {
        this.checkActiveState();
    }

    /**
     * * Check the Link active state value.
     * @memberof Link
     */
    checkActiveState () {
        switch (this.state.active) {
            case true:
                this.active();
                break;
            case false:
                this.inactive();
                break;
        }
    }

    /**
     * * Active the Link.
     * @memberof Link
     */
    active () {
        this.setState("active", true);
        this.html.classList.add("active");
    }

    /**
     * * Inactive the Link.
     * @memberof Link
     */
    inactive () {
        this.setState("active", true);
        this.html.classList.remove("active");
    }

    /**
     * * Returns all the Sidebar Links.
     * @static
     * @param {Sidebar} Sidebar
     * @returns {Link[]}
     * @memberof Link
     */
    static generate (Sidebar) {
        let links = [];
        let htmls = Link.querySelector(Sidebar.props.id);
        for (const key in htmls) {
            if (Object.hasOwnProperty.call(htmls, key)) {
                links.push(new this({
                    props: {
                        id: `link-${ key }`,
                        target: (htmls[key].hasAttribute("href") ? htmls[key].href : "#"),
                        type: (htmls[key].classList.contains("sidebar-link") ? "link" : "button"),
                    }, state: {
                        active: htmls[key].classList.contains("active"),
                    }, html: htmls[key],
                    Sidebar: Sidebar,
                }));
            }
        }
        return links;
    }

    /**
     * * Returns all the Sidebar Links HTMLElements.
     * @static
     * @param {string} id Sidebar primary key.
     * @returns {HTMLElement[]}
     * @memberof Link
     */
    static querySelector (id = false) {
        if (id) {
            return document.querySelectorAll(`#${ id }.sidebar-menu :where(.sidebar-link, .sidebar-button)`);
        }
        if (!id) {
            console.error("ID param is required to get the Sidebar Links");
            return [];
        }
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: "link-1",
        target: "#",
        type: "link",
    }
    
    /**
     * @static
     * @var {object} state Default state.
     */
    static state = {
        active: false,
    }
}