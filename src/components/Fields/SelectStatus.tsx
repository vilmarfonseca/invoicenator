import CheckIcon from "@/components/Icons/ChcekIcon";
import SelectDownHandleIcon from "@/components/Icons/SelectDownHandle";
import { useGlobalState } from "@/context/globalStateContext";
import { useEffect, useRef, useState } from "react";

const StatusSelectField = () => {
  const { currentInvoice, setCurrentInvoice } = useGlobalState();
  const menuItems = [
    ["Undefined", "bg-gray-600", "text-gray-600"],
    ["Paid", "bg-green-600", "text-green-600"],
    ["Unpaid", "bg-red-600", "text-red-600"],
  ];

  const [selectedItem, setSelectedItem] = useState({
    item: menuItems[0],
    idx: 0,
  });
  const [state, setState] = useState(false);
  const selectMenuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedItem?.item) {
      setCurrentInvoice({
        ...currentInvoice,
        ...{ status: selectedItem.item[0] },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    const handleSelectMenu = (e: MouseEvent) => {
      if (
        selectMenuRef.current &&
        !selectMenuRef.current.contains(e.target as Node)
      ) {
        setState(false);
      }
    };

    document.addEventListener("click", handleSelectMenu);
  }, []);

  return (
    <div className="relative max-w-xs min-w-[200px] text-base">
      <span className="block py-2 text-gray-500 font-bold">Status</span>
      <button
        ref={selectMenuRef}
        className="flex items-center justify-between gap-2 w-full px-3 py-2 text-gray-500 bg-white border rounded-md shadow-sm cursor-pointer outline-none focus:border-indigo-600"
        aria-haspopup="true"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={() => setState(!state)}
      >
        <div className="flex items-center gap-x-3">
          <span
            className={`w-2 h-2 rounded-full ${selectedItem.item[1]}`}
          ></span>
          <span className={`text-sm ${selectedItem.item[2]}`}>
            {selectedItem.item[0]}
          </span>
        </div>
        <SelectDownHandleIcon />
      </button>

      {state ? (
        <div className="relative w-full">
          <ul
            className="absolute w-full mt-3 overflow-y-auto bg-white border rounded-md shadow-sm max-h-64"
            role="listbox"
          >
            {menuItems.map((el, idx) => (
              <li
                key={idx}
                onClick={() =>
                  setSelectedItem({
                    item: el,
                    idx,
                  })
                }
                role="option"
                aria-selected={selectedItem.idx == idx ? true : false}
                className={`${
                  selectedItem.idx == idx ? "text-indigo-600 bg-indigo-50" : ""
                } flex items-center justify-between gap-2 px-3 cursor-default py-2 duration-150 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50`}
              >
                <div className="flex items-center gap-x-3">
                  <span className={`w-2 h-2 rounded-full ${el[1]}`}></span>
                  {el[0]}
                </div>
                {selectedItem.idx == idx ? <CheckIcon /> : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default StatusSelectField;
