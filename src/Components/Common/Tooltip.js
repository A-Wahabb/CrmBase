import { Tooltip } from "antd";

const TooltipComp = (props) => {
    return (
        <>

            <Tooltip title={props.tooltip}>
                {props.children}
            </Tooltip>
        </>
    );
}

export default TooltipComp;