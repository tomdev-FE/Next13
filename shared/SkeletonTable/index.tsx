export default function SkeletonTable() {
  const numberOfRows = 6;
  const Row = () => (
    <div className="m-b-1">
      <div className="bg-gray-300 rounded h-12 relative overflow-hidden"></div>
    </div>
  );
  const renderedRows = [...Array(numberOfRows)].map((e, i) => (
    <div key={e}>
      <Row />
    </div>
  ));

  return <> {renderedRows}</>;
}
