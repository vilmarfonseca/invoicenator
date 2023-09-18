import CheckIcon from "@/components/Icons/ChcekIcon";
import SearchIcon from "@/components/Icons/SearchIcon";
import UpDownHandleIcon from "@/components/Icons/UpDownHandleIcon";
import { useGlobalState } from "@/context/globalStateContext";
import { useEffect, useState } from "react";

const SelectClientField = () => {
  const { currentInvoice, setCurrentInvoice } = useGlobalState();
  const menuItems = ["John Doe", "Albert Strudell", "Alexander Cotton"];

  const [selectedItem, setSelectedItem] = useState<{
    name: string | null;
    id: number | null;
  }>({
    name: currentInvoice?.client?.name ?? null,
    id: currentInvoice?.client?.id ?? null,
  });

  useEffect(() => {
    if (selectedItem?.name && selectedItem.name !== "Select a client") {
      setCurrentInvoice({
        ...currentInvoice,
        ...{ client: selectedItem },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  const [state, setState] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const menuEls = document.querySelectorAll(".menu-el-js");
    const searchVal = e.target.value.toLocaleLowerCase();

    menuEls.forEach((el) => {
      el.classList.remove("hidden");
      if (
        el.textContent &&
        !el.textContent.toLocaleLowerCase().includes(searchVal)
      ) {
        el.classList.add("hidden");
      }
    });
  };

  return (
    <div className="relative max-w-sm min-w-[250px] text-[15px]">
      <span className="block py-2 text-gray-500 font-bold">Client</span>
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-gray-500 bg-white border rounded-md shadow-sm cursor-pointer outline-none focus:border-indigo-600 transition-all duration-200"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setState(!state)}
      >
        {selectedItem.name || "Select a client"}
        <UpDownHandleIcon />
      </button>

      {state ? (
        <div className="relative w-full">
          <ul
            className="absolute w-full mt-3 bg-white border rounded-md shadow-sm"
            role="listbox"
          >
            <div className="shadow flex items-center">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                className="p-2 text-gray-500 w-full rounded-md outline-none"
                onInput={handleSearch}
              />
            </div>
            <div className="max-h-64 mt-2 overflow-y-auto">
              {menuItems.map((el, id) => (
                <li
                  key={id}
                  onClick={() => {
                    setSelectedItem({
                      name: el,
                      id,
                    });
                    setState(false);
                  }}
                  role="option"
                  aria-selected={selectedItem.id == id}
                  className={`${
                    selectedItem.id == id ? "text-indigo-600 bg-indigo-50" : ""
                  } menu-el-js flex items-center justify-between px-3 cursor-default py-2 duration-200 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50`}
                >
                  {el}
                  {selectedItem.id == id ? <CheckIcon /> : ""}
                </li>
              ))}
            </div>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectClientField;
