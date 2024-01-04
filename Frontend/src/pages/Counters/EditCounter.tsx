import { useRouteLoaderData } from "react-router";
import CounterForm from "../../components/Forms/CounterForm/CounterForm";

export default function NewCounter() {
    const {counterGroup} = useRouteLoaderData("counter-details") as {counterGroup: any};

    return (
        <CounterForm method="PUT" counterGroup={counterGroup}/>
    );
}
