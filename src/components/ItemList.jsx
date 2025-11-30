import Item from "./Item";

const ItemList = ({ Todos }) => {
  const ItemClasses = "p-3 font-sherif text-md text-gray-200 ";
  return (
    <div
  className="
    mt-6 
    divide-y divide-solid 
    border border-gray-500 
    divide-gray-500 
    mx-5 
    rounded-md

    /* PHONE */
    max-sm:mx-1
    max-sm:w-full 
    max-sm:rounded 
    max-sm:text-sm 
    max-sm:border-gray-600
  "
>
  {Todos.length === 0 && (
    <h2
      className="
        p-2 py-4 
        text-center 
        text-xl 
        text-yellow-200

        /* PHONE */
        max-sm:text-base
        max-sm:py-2
        max-sm:px-1
      "
    >
      There is no any To-Do's of this type!!
    </h2>
  )}

  {Todos.map((item) => (
    <Item
      key={Math.random() * 1000}
      className={`
        ${ItemClasses}

        /* PHONE: shrink inner item padding */
        max-sm:px-2 
        max-sm:py-2
        max-sm:text-sm
      `}
      item={item}
    />
  ))}
</div>

  );
};

export default ItemList;
