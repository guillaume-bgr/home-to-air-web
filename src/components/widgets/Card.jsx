function Card(props) {
    return (
        <div className={"card no-border " + props.className}>
            <div className="card-body">
                <div className="card-header d-flex align-items-center">
                    <div className="card-headings">
                        <h2 className="title">{props.title}</h2>
                        <span className="subtitle">{props.subtitle}</span>
                    </div>
                    <div className="card-helper ms-2">{props.helper}</div>
                </div>
                <div className="card-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Card;