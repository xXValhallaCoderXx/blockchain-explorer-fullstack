import { useGetTaggedTxQuery } from "../../api/tx-api";

const TaggedTransactionsContainer = () => {
  const { data } = useGetTaggedTxQuery();
  console.log("data", data);
  return <div>TaggedTransactionsContainer</div>;
};

export default TaggedTransactionsContainer;
