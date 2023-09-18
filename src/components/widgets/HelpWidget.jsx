function HelpWidget(props) {
    return (
        <div className="help-widget d-flex flex-column">
            <span className="help-widget-button">
                <span className="text-primary d-flex align-items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
                <rect x="11" y="17" width="7" height="2" rx="1" transform="rotate(-90 11 17)" fill="currentColor"/>
                <rect x="11" y="9" width="2" height="2" rx="1" transform="rotate(-90 11 9)" fill="currentColor"/>
                </svg>
                </span>
            </span>
            <div className={"help-widget-popup shadow " + props.modalDirection} style={{width: props.width}}>
                {props.children}
            </div>
        </div>
    )
}

export default HelpWidget