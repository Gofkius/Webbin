import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import Login from "../components/auth/Login";
import SmallProfileCard from "../components/navigation/SmallProfileCard";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Login">
                <Login/>
            </ComponentPreview>
            <ComponentPreview path="/SmallProfileCard">
                <SmallProfileCard/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;