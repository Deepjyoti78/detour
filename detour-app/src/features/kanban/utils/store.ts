import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  priority: Priority;
  description?: string;
  assignee?: string;
  dueDate?: string;
};

type KanbanState = {
  columns: Record<string, Task[]>;
  setColumns: (columns: Record<string, Task[]>) => void;
  addTask: (title: string, description?: string) => void;
};

const initialColumns: Record<string, Task[]> = {
  backlog: [
    {
      id: '1',
      title: 'DT-8946: The Classic 24-Point Safety Inspection',
      priority: 'high',
      assignee: 'Rohit Kulkarni',
      dueDate: '2026-11-22',
      description: 'Check brake fluid, vintage gearbox oil, and polish convertible top before Mumbai handover.'
    },
    {
      id: '2',
      title: 'DT-8947: Top-up EV Battery & Fastag for The Sprint',
      priority: 'medium',
      assignee: 'Priya Sharma',
      dueDate: '2026-11-21',
      description: 'Ensure 100% battery state-of-charge and verify Mumbai-Pune expressway electronic toll.'
    },
    {
      id: '3',
      title: 'The Overland: Mount Hood Winter Tire Mounting',
      priority: 'high',
      assignee: 'Sarah Jenkins',
      dueDate: '2026-11-23',
      description: 'Mount all-weather studs and verify expedition roof rack luggage straps.'
    },
    {
      id: '4',
      title: 'The Urbanist: Scheduled 30,000 km Brake Overhaul',
      priority: 'medium',
      assignee: 'Manish Singh',
      dueDate: '2026-11-24',
      description: 'Replace front ceramic pads and bleed hydraulic lines at Kolkata depot.'
    }
  ],
  inProgress: [
    {
      id: '5',
      title: 'DT-8942: Active Handover - The Roadster at Goa Hub',
      priority: 'high',
      assignee: 'Carlos D’Souza',
      dueDate: '2026-11-20',
      description: 'Customer Marcus Vance collecting keys for 4-day Konkan Coastline Drive.'
    },
    {
      id: '6',
      title: 'DT-8944: The Overland Active Desert Expedition',
      priority: 'medium',
      assignee: 'Manish Singh',
      dueDate: '2026-11-25',
      description: 'GPS telemetry normal on Jaipur-Jaisalmer highway. Fuel efficiency at 11.2 km/L.'
    },
    {
      id: '7',
      title: 'DT-8945: The Touring Scheduled Return at Portland',
      priority: 'high',
      assignee: 'Sarah Jenkins',
      dueDate: '2026-11-21',
      description: 'Chloe Bennett returning vehicle at Portland Airport depot. Inspection bay #2 reserved.'
    }
  ],
  done: [
    {
      id: '8',
      title: 'DT-8939: The Grand Tourer Post-Trip Detailing',
      priority: 'low',
      assignee: 'Sarah Jenkins',
      dueDate: '2026-11-19',
      description: 'Steam clean cabin, exterior wash, and sanitize ventilation system. Ready for next lease.'
    },
    {
      id: '9',
      title: 'DT-8940: Security Deposit Refund - Elena Rostova',
      priority: 'medium',
      assignee: 'Arjun Menon',
      dueDate: '2026-11-19',
      description: '$500 security deposit hold released after zero-scratch return inspection.'
    },
    {
      id: '10',
      title: 'The Cabriolet: Vintage Chrome Polish & Storage Cover',
      priority: 'low',
      assignee: 'Priya Sharma',
      dueDate: '2026-11-18',
      description: 'Completed annual concours-grade detailing. Parked in climate-controlled bay.'
    }
  ]
};

export const useTaskStore = create<KanbanState>()((set) => ({
  columns: initialColumns,

  setColumns: (columns) => set({ columns }),

  addTask: (title, description) =>
    set((state) => ({
      columns: {
        ...state.columns,
        backlog: [
          {
            id: uuid(),
            title,
            description,
            priority: 'medium' as Priority,
            assignee: 'Operations Desk',
            dueDate: new Date().toISOString().slice(0, 10)
          },
          ...(state.columns.backlog ?? [])
        ]
      }
    }))
}));
