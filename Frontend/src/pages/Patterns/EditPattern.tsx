import { useRouteLoaderData } from "react-router";
import PatternForm from "../../components/Forms/PatternForm/PatternForm";
import { Pattern } from "../../DTOs/Pattern";

export default function EditPattern() {
    const { pattern } = useRouteLoaderData("pattern-details") as { pattern: Pattern };

    return (
        <PatternForm pattern={pattern} method="PUT" />
    );
}
