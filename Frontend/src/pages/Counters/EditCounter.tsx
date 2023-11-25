import { useRouteLoaderData } from "react-router";
import CounterForm from "../../components/CounterForm/CounterForm";

export default function NewCounter() {
    const {counterGroup} = useRouteLoaderData("counterGroup-detials") as {counterGroup: any};

    return (
        <CounterForm method="POST" counterGroup={counterGroup}/>
    );
}
