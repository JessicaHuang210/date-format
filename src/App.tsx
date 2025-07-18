import { useState } from "react";
import "./App.css";
import {
  formateDate,
  formatDateToTemplate,
  formatUTCTimestampToTemplate,
} from "./utils";

function App() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const [date, setDate] = useState(formateDate(new Date()));
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offsetMinutes = new Date().getTimezoneOffset() / 60;

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-1">
        Date Format{" "}
        <div className="badge badge-soft badge-info text-sm md:text-base">
          {timeZone} ({offsetMinutes < 0 ? "+" : "-"}
          {Math.abs(offsetMinutes)}:00)
        </div>
      </h1>

      <p className="text-gray-500 text-sm md:text-base mb-5">
        This is a simple date format tool that allows you to format dates in
        different ways.
      </p>
      <div role="tablist" className="tabs tabs-box">
        <a
          role="tab"
          className={`tab ${
            activeTab === "tab1" ? "tab-active !rounded-b-none" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Timestamp
        </a>
        {activeTab === "tab1" && (
          <div className="tab-content bg-base-100 p-5 flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Enter timestamp (1522560000)"
                value={timestamp}
                onChange={(e) => {
                  setTimestamp(Number(e.target.value));
                }}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  setTimestamp(new Date().getTime());
                }}
              >
                NOW
              </button>
            </div>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th className="w-16"></th>
                  <th>label</th>
                  <th>value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <td>{new Date(timestamp).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>
                    <div className="badge badge-soft badge-primary badge-xs">
                      UTC
                    </div>
                  </th>
                  <th>ISO String</th>
                  <td>{new Date(timestamp).toISOString()}</td>
                </tr>
                <tr>
                  <th>
                    <div className="badge badge-soft badge-primary badge-xs">
                      UTC
                    </div>
                  </th>
                  <th>UTC Time</th>
                  <td>{new Date(timestamp).toUTCString()}</td>
                </tr>
              </tbody>
            </table>
            <div className="divider"></div>
            <div className="flex gap-2 flex-col md:flex-row">
              <div className="flex-1">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th className="w-16"></th>
                      <th>label</th>
                      <th>value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>YYYY-MM-DD</th>
                      <td>
                        {formatUTCTimestampToTemplate(timestamp, "YYYY-MM-DD")}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>HH:MM:SS</th>
                      <td>
                        {formatUTCTimestampToTemplate(timestamp, "HH:mm:ss")}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCFullYear</th>
                      <td>{new Date(timestamp).getUTCFullYear()}</td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCMonth</th>
                      <td>
                        <span>{new Date(timestamp).getUTCMonth()} </span>
                        <span className="text-gray-500 text-sm">
                          (月份從0開始，所以要顯示要+1)
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-base-200">
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCDate</th>
                      <td>{new Date(timestamp).getUTCDate()}</td>
                    </tr>
                    <tr className="bg-base-200">
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCHours</th>
                      <td>{new Date(timestamp).getUTCHours()}</td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCMinutes</th>
                      <td>{new Date(timestamp).getUTCMinutes()}</td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCSeconds</th>
                      <td>{new Date(timestamp).getUTCSeconds()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex-1">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th className="w-16"></th>
                      <th>label</th>
                      <th>value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>YYYY-MM-DD</th>
                      <td>
                        {new Date(timestamp)
                          .toLocaleDateString("zh-TW", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\//g, "-")}
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>HH:MM:SS</th>
                      <td>{new Date(timestamp).toTimeString()}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>getFullYear</th>
                      <td>{new Date(timestamp).getFullYear()}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>getMonth</th>
                      <td>
                        <span>{new Date(timestamp).getMonth()} </span>
                        <span className="text-gray-500 text-sm">
                          (月份從0開始，所以要顯示要+1)
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-base-200">
                      <th></th>
                      <th>getDate</th>
                      <td>{new Date(timestamp).getDate()}</td>
                    </tr>
                    <tr className="bg-base-200">
                      <th></th>
                      <th>getHours</th>
                      <td>{new Date(timestamp).getHours()}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>getMinutes</th>
                      <td>{new Date(timestamp).getMinutes()}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>getSeconds</th>
                      <td>{new Date(timestamp).getSeconds()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        <a
          role="tab"
          className={`tab ${
            activeTab === "tab2" ? "tab-active !rounded-b-none" : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Date (YYYY/MM/DD HH:MM:SS)
        </a>
        {activeTab === "tab2" && (
          <div className="tab-content bg-base-100 p-5 flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter date (YYYY-MM-DD HH:MM:SS)"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  setDate(formateDate(new Date()));
                }}
              >
                NOW
              </button>
            </div>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th className="w-16"></th>
                  <th>label</th>
                  <th>value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th></th>
                  <th>Timestamp</th>
                  <td>{new Date(date).getTime()}</td>
                </tr>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <td>{new Date(date).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>
                    <div className="badge badge-soft badge-primary badge-xs">
                      UTC
                    </div>
                  </th>
                  <th>ISO String</th>
                  <td>{new Date(date).toISOString()}</td>
                </tr>
                <tr>
                  <th>
                    <div className="badge badge-soft badge-primary badge-xs">
                      UTC
                    </div>
                  </th>
                  <th>UTC Time</th>
                  <td>{new Date(date).toUTCString()}</td>
                </tr>
              </tbody>
            </table>
            <div className="divider"></div>
            <div className="flex gap-2 flex-col md:flex-row">
              <div className="flex-1">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th className="w-16"></th>
                      <th>label</th>
                      <th>value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>YYYY-MM-DD</th>
                      <td>
                        {formatDateToTemplate(
                          new Date(date),
                          "YYYY-MM-DD",
                          true
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>HH:MM:SS</th>
                      <td>
                        {formatDateToTemplate(new Date(date), "HH:mm:ss", true)}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCFullYear</th>
                      <td>{new Date(date).getUTCFullYear()}</td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCMonth</th>
                      <td>
                        <span>{new Date(date).getUTCMonth()} </span>
                        <span className="text-gray-500 text-sm">
                          (月份從0開始，所以要顯示要+1)
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCDate</th>
                      <td>{new Date(date).getUTCDate()}</td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCHours</th>
                      <td>{new Date(date).getUTCHours()}</td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCMinutes</th>
                      <td>{new Date(date).getUTCMinutes()}</td>
                    </tr>
                    <tr>
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCSeconds</th>
                      <td>{new Date(date).getUTCSeconds()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex-1">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th className="w-16"></th>
                      <th>label</th>
                      <th>value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>YYYY-MM-DD</th>
                      <td>
                        {formatDateToTemplate(new Date(date), "YYYY-MM-DD")}
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>HH:MM:SS</th>
                      <td>
                        {formatDateToTemplate(new Date(date), "HH:mm:ss")}
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>getFullYear</th>
                      <td>{new Date(date).getFullYear()}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>getMonth</th>
                      <td>
                        <span>{new Date(date).getMonth()} </span>
                        <span className="text-gray-500 text-sm">
                          (月份從0開始，所以要顯示要+1)
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>getDate</th>
                      <td>{new Date(date).getDate()}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>getHours</th>
                      <td>{new Date(date).getHours()}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>getMinutes</th>
                      <td>{new Date(date).getMinutes()}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>getSeconds</th>
                      <td>{new Date(date).getSeconds()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
