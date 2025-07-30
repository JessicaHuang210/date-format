"use client";

import { useState, useEffect } from "react";
import {
  formateDate,
  formatDateToTemplate,
  formatUTCTimestampToTemplate,
} from "@/lib/utils";
import { Copy, Check, RefreshCcw } from "lucide-react";

export default function ClientDateFormatApp() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [timestamp, setTimestamp] = useState(0);
  const [date, setDate] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 在客戶端設置初始值
  useEffect(() => {
    setMounted(true);
    setTimestamp(new Date().getTime());
    setDate(formateDate(new Date()));
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // 如果還沒掛載，顯示加載狀態
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-500 ease-in-out ${
          showToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="alert alert-success shadow-lg">
          <Check className="w-4 h-4" />
          <span>複製成功！</span>
        </div>
      </div>

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
                <RefreshCcw className="w-3.5 h-3.5" />
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
                  <td>
                    {new Date(timestamp).toISOString()}
                    <button
                      className="btn btn-xs ml-2"
                      onClick={() => {
                        handleCopy(new Date(timestamp).toISOString());
                      }}
                    >
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div className="badge badge-soft badge-primary badge-xs">
                      UTC
                    </div>
                  </th>
                  <th>UTC Time</th>
                  <td>
                    {new Date(timestamp).toUTCString()}
                    <button
                      className="btn btn-xs ml-2"
                      onClick={() => {
                        handleCopy(new Date(timestamp).toUTCString());
                      }}
                    >
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </td>
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
                        <button
                          className="btn btn-xs ml-2"
                          onClick={() => {
                            handleCopy(
                              formatUTCTimestampToTemplate(
                                timestamp,
                                "YYYY-MM-DD"
                              )
                            );
                          }}
                        >
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        </button>
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
                        <button
                          className="btn btn-xs ml-2"
                          onClick={() => {
                            handleCopy(
                              formatUTCTimestampToTemplate(
                                timestamp,
                                "HH:mm:ss"
                              )
                            );
                          }}
                        >
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        </button>
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
                        <button
                          className="btn btn-xs ml-2"
                          onClick={() => {
                            handleCopy(
                              new Date(timestamp)
                                .toLocaleDateString("zh-TW", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                })
                                .replace(/\//g, "-")
                            );
                          }}
                        >
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>HH:MM:SS</th>
                      <td>
                        {new Date(timestamp).toTimeString()}
                        <button
                          className="btn btn-xs ml-2"
                          onClick={() => {
                            handleCopy(new Date(timestamp).toTimeString());
                          }}
                        >
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </td>
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
                <RefreshCcw className="w-3.5 h-3.5" />
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
                  <td>
                    {new Date(date).getTime()}
                    <button
                      className="btn btn-xs ml-2"
                      onClick={() => {
                        handleCopy(new Date(date).getTime().toString());
                      }}
                    >
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </td>
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
                  <td>
                    {new Date(date).toISOString()}
                    <button
                      className="btn btn-xs ml-2"
                      onClick={() => {
                        handleCopy(new Date(date).toISOString());
                      }}
                    >
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div className="badge badge-soft badge-primary badge-xs">
                      UTC
                    </div>
                  </th>
                  <th>UTC Time</th>
                  <td>
                    {new Date(date).toUTCString()}
                    <button
                      className="btn btn-xs ml-2"
                      onClick={() => {
                        handleCopy(new Date(date).toUTCString());
                      }}
                    >
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </td>
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
                        <button
                          className="btn btn-xs ml-2"
                          onClick={() => {
                            handleCopy(
                              formatDateToTemplate(
                                new Date(date),
                                "YYYY-MM-DD",
                                true
                              )
                            );
                          }}
                        >
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        </button>
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
                        <button
                          className="btn btn-xs ml-2"
                          onClick={() => {
                            handleCopy(
                              formatDateToTemplate(
                                new Date(date),
                                "HH:mm:ss",
                                true
                              )
                            );
                          }}
                        >
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        </button>
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
                    <tr className="bg-base-200">
                      <th>
                        <div className="badge badge-soft badge-primary badge-xs">
                          UTC
                        </div>
                      </th>
                      <th>getUTCDate</th>
                      <td>{new Date(date).getUTCDate()}</td>
                    </tr>
                    <tr className="bg-base-200">
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
                        <button
                          className="btn btn-xs ml-2"
                          onClick={() => {
                            handleCopy(
                              formatDateToTemplate(new Date(date), "YYYY-MM-DD")
                            );
                          }}
                        >
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>HH:MM:SS</th>
                      <td>
                        {formatDateToTemplate(new Date(date), "HH:mm:ss")}
                        <button
                          className="btn btn-xs ml-2"
                          onClick={() => {
                            handleCopy(
                              formatDateToTemplate(new Date(date), "HH:mm:ss")
                            );
                          }}
                        >
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        </button>
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
                    <tr className="bg-base-200">
                      <th></th>
                      <th>getDate</th>
                      <td>{new Date(date).getDate()}</td>
                    </tr>
                    <tr className="bg-base-200">
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
    </>
  );
}
