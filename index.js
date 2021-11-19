import { IfcAPI, IFCWALL } from "web-ifc/web-ifc-api";

const ifcApi = new IfcAPI();
ifcApi.Init();
ifcApi.SetWasmPath("web-ifc.wasm");

console.log("Hello");

const b = document.getElementById("input-btn");
const input = document.getElementById("input-element");
const resultContainer = document.getElementById("content");

b.onclick = () => {
    input.click();
};

input.onchange = (changed) => {
    const reader = new FileReader();
    reader.onload = () => loadIfc(reader.result);
    reader.readAsText(changed.target.files[0]);
}

function loadIfc(ifcData) {

    const modelID = ifcApi.OpenModel(ifcData);

    const allItems = ifcApi.GetAllLines(modelID);

    const walls = ifcApi.GetLineIDsWithType(modelID, IFCWALL);

    const firstWall = walls.get(0);
    const wallProps = ifcApi.GetLine(modelID, firstWall);

    const result = JSON.stringify(wallProps, undefined, 2);
    resultContainer.textContent = result;

    // const size = walls.size();

    // for(let i = 0; i< size; i++) {
    //     const  wall = walls.get(i);
    //     const wallProps = ifcApi.GetLine(modelID, wall);
    //     console.log(wallProps);
    // }
}