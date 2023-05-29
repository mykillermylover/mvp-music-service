import {FC, useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const NotFound: FC = () => {
    const store = useContext(Context);
    return (
        <div>
            404
        </div>
    )
}

export default observer(NotFound);