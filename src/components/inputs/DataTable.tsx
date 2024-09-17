// interface TableData {
//   [key: string]: string | number | undefined;
// }

// interface TableProps<T extends TableData> {
//   columns: Array<keyof T>;
//   data: T[];
// }

// const Table = <T extends TableData>({ columns, data }: TableProps<T>) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             // Use type assertion to ensure column is treated as string or number
//             <th key={column as string | number}>{column as string}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {columns.map((column) => (
//               // Use type assertion to ensure key is string or number
//               <td key={column as string | number}>{row[column]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;
