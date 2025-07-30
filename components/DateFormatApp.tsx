import ClientDateFormatApp from "@/components/ClientDateFormatApp";

export default function DateFormatApp() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offsetMinutes = new Date().getTimezoneOffset() / 60;

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-1">
        日期格式轉換工具
        <div className="badge badge-soft badge-info text-sm md:text-base ml-2">
          {timeZone} ({offsetMinutes < 0 ? "+" : "-"}
          {Math.abs(offsetMinutes)}:00)
        </div>
      </h1>

      <p className="text-gray-500 text-sm md:text-base mb-1">
        這是一個簡單好用的日期格式轉換工具，支援多種格式轉換與時間戳查詢，讓你輕鬆快速取得所需的日期格式。
      </p>
      <div className="flex items-center gap-2 mb-5">
        <div className="badge badge-soft text-gray-400">時間戳查詢</div>
        <div className="badge badge-soft text-gray-400">日期格式化</div>
        <div className="badge badge-soft text-gray-400">Timestamp 轉換</div>
      </div>
      <ClientDateFormatApp />
    </div>
  );
}
