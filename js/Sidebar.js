/**
 * * Sidebar makes an excellent sidebar.
 * @export
 * @class Sidebar
 */
export class Sidebar{
    /**
     * * Creates an instance of Sidebar.
     * @param {object} properties - Sidebar properties.
     * @memberof Sidebar
     */
    constructor(properties = {
        id: 'sidebar-1',
        position: 'left',
    }, states = {
        open: false,
    }){
        this.setProperties(properties);
        this.setStates(states);
        this.setHTML();
        this.setButtons();
        this.checkOpenedSidebar();
    }

    /**
     * * Set the Sidebar properties.
     * @param {object} properties - Sidebar properties.
     * @memberof Sidebar
     */
    setProperties(properties = {
        id: 'nav-1',
        position: 'left',
    }){
        this.properties = {};
        this.setId(properties);
        this.setPosition(properties);
    }

    /**
     * * Set the Sidebar states.
     * @param {object} states - Sidebar states.
     * @memberof Sidebar
     */
    setStates(states = {
        open: false,
    }){
        this.states = {};
        this.setOpen(states);
    }

    /**
     * * Set the Sidebar ID.
     * @param {object} properties - Sidebar properties.
     * @memberof Sidebar
     */
    setId(properties = {
        id: 'left',
    }){
        this.properties.id = properties.id;
    }

    /**
     * * Set the Sidebar position.
     * @param {object} properties - Sidebar properties.
     * @memberof Sidebar
     */
    setPosition(properties = {
        position: 'left',
    }){
        this.properties.position = properties.position;
    }

    /**
     * * Set the Sidebar open state.
     * @param {object} states - Sidebar states.
     * @memberof Sidebar
     */
    setOpen(states = {
        open: [],
    }){
        this.states.open = states.open;
    }

    /**
     * * Set the Sidebar HTML Element.
     * @memberof Sidebar
     */
    setHTML(){
        let sidebars = document.querySelectorAll('.sidebar');
        if(sidebars.length){
            for(const sidebar of sidebars){
                if(sidebar.id == this.properties.id){
                    this.html = sidebar;
                }
            }
        }
    }

    /**
     * * Set the opener & the closer buttons.
     * @memberof Sidebar
     */
    setButtons(){
        let sidebar = this;
        this.btnsOpener = [];
        let btnsOpener = document.querySelectorAll(`.sidebar-button.open-btn.${this.properties.position}`);
        this.btnCloser = document.querySelector(`#${this.properties.id} .sidebar-button.close-btn`);
        for(const btn of btnsOpener){
            if(btn.href.split('#').pop() == this.properties.id){
                this.btnsOpener.push(btn);
                btn.addEventListener('click', function(e){
                    if(this.classList.contains('sidebar-button')){
                        e.preventDefault();
                    }
                    sidebar.switch();
                });
            }
        }
        this.btnCloser.addEventListener("click", function(e){
            e.preventDefault();
            sidebar.switch();
        });
        this.addEventToSidebarButtons();
    }

    /**
     * * Add the close event to the Sidebar custom buttons.
     * @memberof Sidebar
     */
    addEventToSidebarButtons(){
        let sidebar = this;
        let sidebarButtons = document.querySelectorAll(`#${this.properties.id} .sidebar-link.sidebar-button`);
        for(const btn of sidebarButtons){
            btn.addEventListener('click', function(e){
                sidebar.switch();
            });
        }
    }

    /**
     * * Switch the Sidebar open state.
     * @returns
     * @memberof Sidebar
     */
    switch(){
        switch(this.states.open){
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
    open(){
        this.states.open = true;
        if(this.html.classList.contains('closed')){
            this.html.classList.remove('closed');
        }
        this.html.classList.add('opened');
    }
    
    /**
     * * Close the Sidebar
     * @memberof Sidebar
     */
    close(){
        this.states.open = false;
        if(this.html.classList.contains('opened')){
            this.html.classList.remove('opened');
        }
        this.html.classList.add('closed');
    }

    /**
     * * Check if should be a current Dropdown open.
     * @memberof Dropdown
     */
    checkOpenedSidebar(){
        if(this.states.open){
            this.switch();
        }
    }

    /**
     * * Get the Sidebar positions.
     * @static
     * @param {object} properties - The Sidebar properties.
     * @return {object}
     * @memberof Sidebar
     */
    static getPositions(properties = {position: ['left', 'right'],}){
        if(typeof properties.position != 'object'){
            throw new Error({
                status: 415,
                message: 'The Sidebar properties position must be a valid object.',
                display: true,
            });
        }
        let positions = [];
        for(const position of properties.position){
            positions.push(position);
        }
        return positions;
    }
}