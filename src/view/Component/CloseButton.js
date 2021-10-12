import { CloseOutlined } from "@ant-design/icons";
import { deleteSubtask } from "../../features/task/contentSlice";

function CloseButton(props) {
    if(props.type==='DeleteSubtask'){
        return(
            <CloseOutlined onClick={deleteSubtask} />
        )
    }
}