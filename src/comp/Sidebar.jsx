import React, { useContext, useEffect } from "react";
import { MobileContext } from "../context/MobileContext";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

const Sidebar = () => {
    const {
        brand,
        filter,
        setFilter,
        fetchFiltered,
        ram,
        setRamFilter,
        ramFilter,
    } = useContext(MobileContext);

    useEffect(() => {
        fetchFiltered();
    }, [filter, ramFilter]);

    function filterHandler(e) {
        if (e.target.checked) {
            setFilter([...filter, e.target.value]);
        } else {
            console.log(e.target.value);
            setFilter(filter.filter((item) => item !== e.target.value));
        }
    }

    function RAMHandler(e) {
        if (e.target.checked) {
            setRamFilter([...ramFilter, e.target.value]);
        } else {
            console.log(e.target.value);
            setRamFilter(ramFilter.filter((item) => item !== e.target.value));
        }
    }

    return (
        <div className="w-full ml-10">
            <div className="mt-8 font-semibold text-xl mb-1 max-md:mt-4">
                Brand
            </div>
            <div className="pl-3 flex flex-col flex-wrap max-md:flex-row max-md:gap-6">
                {brand?.map((item, idx) => {
                    return (
                        <CheckboxGroup key={idx} colorScheme="green">
                            <Stack
                                spacing={[1, 5]}
                                direction={["column", "row"]}
                            >
                                <Checkbox
                                    value={item}
                                    id={idx}
                                    onChange={filterHandler}
                                >
                                    {item}
                                </Checkbox>
                            </Stack>
                        </CheckboxGroup>
                    );
                })}
            </div>
            <div className="mt-6 font-semibold text-lg mb-1 max-md:mt-3">
                RAM
            </div>
            <div className="pl-3 flex flex-col flex-wrap max-md:flex-row max-md:gap-6">
                {ram?.map((item, idx) => {
                    return (
                        <CheckboxGroup key={idx} colorScheme="green">
                            <Stack
                                spacing={[1, 5]}
                                direction={["column", "row"]}
                            >
                                <Checkbox
                                    value={String(item)}
                                    id={idx}
                                    onChange={RAMHandler}
                                >
                                    {item}
                                </Checkbox>
                            </Stack>
                        </CheckboxGroup>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
