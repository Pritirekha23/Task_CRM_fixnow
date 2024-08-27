import React from "react";
import {
  MdAdminPanelSettings,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaTasks } from "react-icons/fa"; 
import { MdFileCopy } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { summary } from "../assets/data";
import clsx from "clsx";
import { TiGroup } from "react-icons/ti";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartData = {
  labels: ['Category A', 'Category B', 'Category C'],
  datasets: [
    {
      data: [15, 25, 10], 
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
};

const PaymentVoucherTable = () => (
  <div className="bg-white shadow-md rounded-lg p-4 flex-1">
  <div className="mb-4">
    <h2 className="text-2xl font-bold text-gray-700">Payemnet Voucher</h2>
  </div>
  <table className="min-w-full bg-white border border-gray-200">
    <thead>
      <tr style={{ backgroundColor: '#BDE8CA' }}>
        <th className="border-b px-4 py-2 text-left">S/N</th>
        <th className="border-b px-4 py-2 text-left">Subject</th>
        <th className="border-b px-4 py-2 text-left">Date</th>
        <th className="border-b px-4 py-2 text-left">Status</th>
      </tr>
    </thead>
   
  <tbody>
    <tr>
      <td className="border-b px-4 py-2">1</td>
      <td className="border-b px-4 py-2">Project Kickoff Meeting</td>
      <td className="border-b px-4 py-2">2024-08-01</td>
      <td className="border-b px-4 py-2">Completed</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">2</td>
      <td className="border-b px-4 py-2">Quarterly Review</td>
      <td className="border-b px-4 py-2">2024-08-10</td>
      <td className="border-b px-4 py-2">Pending</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">3</td>
      <td className="border-b px-4 py-2">Client Presentation</td>
      <td className="border-b px-4 py-2">2024-08-15</td>
      <td className="border-b px-4 py-2">Completed</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">4</td>
      <td className="border-b px-4 py-2">Team Building Exercise</td>
      <td className="border-b px-4 py-2">2024-08-20</td>
      <td className="border-b px-4 py-2">Scheduled</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">5</td>
      <td className="border-b px-4 py-2">Annual Audit</td>
      <td className="border-b px-4 py-2">2024-08-30</td>
      <td className="border-b px-4 py-2">Pending</td>
    </tr>
  </tbody>
  </table>
</div>
);

const PieChartCard = () => (
  <div className="flex-1 bg-white border border-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Staff Applications Card</h2>
    <div className="flex">
      {/* Pie Chart */}
      <div className="flex-shrink-0" style={{ width: '250px', height: '250px' }}>
        <Pie data={PieChartData} options={{ responsive: true }} />
      </div>
      
      {/* Categories */}
      <div className="ml-4 flex-1">
        <ul className="space-y-2">
          {PieChartData.labels.map((label, index) => (
            <li key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: PieChartData.datasets[0].backgroundColor[index] }}
              />
              <span className="text-gray-700">{label}</span>
              <span className="text-gray-500">{PieChartData.datasets[0].data[index]}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const totals = summary.tasks || {};
  const stats = [
    {
      _id: "1",
      label: "Total no. of Staff",
      total: summary?.totalTasks || 0,
      icon: <TiGroup />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "Tptal application",
      total: totals["completed"] || 0,
      icon: < MdFileCopy />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "Total Projects",
      total: totals["in progress"] || 0,
      icon: <GrProjects />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "Total departments",
      total: totals["todo"] || 0,
      icon: <FaTasks />,
      bg: "bg-[#be185d]",
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          <span className="text-sm text-gray-400">{"110 last month"}</span>
        </div>
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full py-4">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
    {stats.map(({ icon, bg, label, total }, index) => (
      <Card key={index} icon={icon} bg={bg} label={label} count={total} />
    ))}
  </div>
  <div className="mt-4 flex space-x-4">
  <div className="bg-white shadow-md rounded-lg p-4 flex-1">
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-700">Memo</h2>
    </div>
    <table className="min-w-full bg-white border border-gray-200">
  <thead>
    <tr style={{ backgroundColor: '#BDE8CA' }}>
      <th className="border-b px-4 py-2 text-left">S/N</th>
      <th className="border-b px-4 py-2 text-left">Memo Title</th>
      <th className="border-b px-4 py-2 text-left">Sent From</th>
      <th className="border-b px-4 py-2 text-left">Sent To</th>
      <th className="border-b px-4 py-2 text-left">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border-b px-4 py-2">1</td>
      <td className="border-b px-4 py-2">Memo 1</td>
      <td className="border-b px-4 py-2">Sender A</td>
      <td className="border-b px-4 py-2">Receiver A</td>
      <td className="border-b px-4 py-2">Pending</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">2</td>
      <td className="border-b px-4 py-2">Memo 2</td>
      <td className="border-b px-4 py-2">Sender B</td>
      <td className="border-b px-4 py-2">Receiver B</td>
      <td className="border-b px-4 py-2">Completed</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">3</td>
      <td className="border-b px-4 py-2">Memo 3</td>
      <td className="border-b px-4 py-2">Sender C</td>
      <td className="border-b px-4 py-2">Receiver C</td>
      <td className="border-b px-4 py-2">Pending</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">4</td>
      <td className="border-b px-4 py-2">Memo 4</td>
      <td className="border-b px-4 py-2">Sender D</td>
      <td className="border-b px-4 py-2">Receiver D</td>
      <td className="border-b px-4 py-2">Completed</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">5</td>
      <td className="border-b px-4 py-2">Memo 5</td>
      <td className="border-b px-4 py-2">Sender E</td>
      <td className="border-b px-4 py-2">Receiver E</td>
      <td className="border-b px-4 py-2">Pending</td>
    </tr>
  </tbody>
</table>

  </div>
  
  {/* Staff Table Card */}
  <div className="bg-white shadow-md rounded-lg p-4 flex-1">
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-700">Staff List</h2>
    </div>
    <table className="min-w-full bg-white border border-gray-200">
  <thead>
    <tr style={{ backgroundColor: '#BDE8CA' }}>
      <th className="border-b px-4 py-2 text-left">S/N</th>
      <th className="border-b px-4 py-2 text-left">Staff Name</th>
      <th className="border-b px-4 py-2 text-left">Staff Role</th>
      <th className="border-b px-4 py-2 text-left">Designation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border-b px-4 py-2">1</td>
      <td className="border-b px-4 py-2">Alice Johnson</td>
      <td className="border-b px-4 py-2">Software Engineer</td>
      <td className="border-b px-4 py-2">Lead Developer</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">2</td>
      <td className="border-b px-4 py-2">Bob Smith</td>
      <td className="border-b px-4 py-2">Project Manager</td>
      <td className="border-b px-4 py-2">Senior PM</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">3</td>
      <td className="border-b px-4 py-2">Carol White</td>
      <td className="border-b px-4 py-2">UX Designer</td>
      <td className="border-b px-4 py-2">Senior Designer</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">4</td>
      <td className="border-b px-4 py-2">David Brown</td>
      <td className="border-b px-4 py-2">QA Analyst</td>
      <td className="border-b px-4 py-2">Senior QA</td>
    </tr>
    <tr>
      <td className="border-b px-4 py-2">5</td>
      <td className="border-b px-4 py-2">Eva Davis</td>
      <td className="border-b px-4 py-2">Marketing Specialist</td>
      <td className="border-b px-4 py-2">Marketing Lead</td>
    </tr>
  </tbody>
</table>
  </div>
</div>

{/* 2nd two tables with pie chart */}
<div className="mt-4 flex space-x-4">
    {/* Payment Voucher Table */}
    <PaymentVoucherTable />
    
    {/* Pie Chart Card */}
    <PieChartCard />
  </div>
</div>

  );
};

export default Dashboard;
