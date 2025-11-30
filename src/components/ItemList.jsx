import Item from "./Item";

const ItemList = ({ Todos }) => {
  const ItemClasses = "p-3 font-sherif text-md text-gray-200 ";
  return (
    <div className=" mt-6 divide-y divide-solid border border-gray-500 divide-gray-500 mx-5 rounded-md ">
      {Todos.length==0&& <h2 className="p-2 py-4 text-center text-xl text-yellow-200">There is no any To-Do's of this type!!</h2>}
      {Todos.map((item) => {
        return (
          <Item
            key={Math.random() * 1000}
            className={ItemClasses}
            item={item}
          ></Item>
        );
      })}
      
    </div>
  );
};

export default ItemList;
