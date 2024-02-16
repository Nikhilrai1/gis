// import { useEffect, useState } from "react"

// interface OptionType {
//     label: string;
//     value: string;
// }

// interface MultiSelectProps {
//     onChange: (value: OptionType) => void;
//     options: OptionType[];
// }
// export function MultiSelect() {
//     const [value, setValue] = useState<OptionType>();

//     const handleOnChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
//         setValue(e.target.value);
//     }

//     return (
//         <select
//             value={value}
//             onChange={handleOnChange}
//             className="border border-gray-100 rounded bg-theme text-primary-blue-900 p-2"
//         >
//             <option value="5">{"5 per page"}</option>
//             <option value="10">{"10 per page"}</option>
//             <option value="20">{"20 per page"}</option>
//         </select>
//     )
// }
