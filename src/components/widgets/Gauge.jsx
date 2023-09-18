function Gauge(props) {
    let className = ''

    if (props.percent > 60) {
        className = "good"
    } else if (props.percent > 35) {
        className = "average"
    } else {
        className = "low"
    }


    return (
        <>
            <a href="#" className="fw-bold">
                {props.percent}%
            </a>
            <div className="gauge">
                <div className={"percentage " + className} style={{width: props.percent+'%'}}></div>
            </div>
        </>
    )
}

export default Gauge;