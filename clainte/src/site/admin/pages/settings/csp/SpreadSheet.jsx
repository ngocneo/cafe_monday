import React from "react";
import Spreadsheet from "x-data-spreadsheet";
import "x-data-spreadsheet/dist/xspreadsheet.css";
import { xtos, stox } from "./utils/utils";
import * as XLSX from "xlsx";

const SpreadSheet = () => {
  const divRef = React.useRef();

  const options = React.useMemo(
    () => ({
      view: {
        height: () => document.documentElement.clientHeight - 100,
        width: () => document.documentElement.clientWidth - 50
      }
    }),
    []
  );

  React.useEffect(() => {
    if (!divRef.current.grid) {
      divRef.current.grid = new Spreadsheet(divRef.current, options);
    }
  }, [divRef, options]);

  // read as arraybuffer
  const loadFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      let data = e.target.result;
      data = new Uint8Array(data);
      processWB(XLSX.read(data, { type: "array" }));
    };
    reader.onerror = function (err) {
      console.log(err);
    };
    reader.readAsArrayBuffer(file);
  };

  // read as binary string
  const loadFile1 = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: "binary"
      });
      workbook.SheetNames.forEach(function (sheetName) {
        const XLRowObject = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
        console.log(sheetName, XLRowObject);
      });
      processWB(workbook);
    };

    reader.onerror = function (err) {
      console.log(err);
    };

    reader.readAsBinaryString(file);
  };

  const processWB = (wb) => {
    const xspr = divRef.current?.grid;
    const data = stox(wb);
    xspr.loadData(data);
  };

  const downloadXLSX = () => {
    const xspr = divRef.current?.grid;
    const new_wb = xtos(xspr.getData());
    XLSX.writeFile(new_wb, "SheetJS.xlsx");
  };

  return (
    <>
      <input type="file" onChange={loadFile1} />
      <div
        id="x-spreadsheet-demo"
        ref={divRef}
        // style={{ width: "100%", height: 300 }}
      />
      <button onClick={downloadXLSX} style={{ float: "right" }}>
        {"Download XLSX"}
      </button>
    </>
  );
};

export default SpreadSheet;
