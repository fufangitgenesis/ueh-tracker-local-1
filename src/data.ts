import { Criterion, InputType } from './types';

export const CLUBS_UNIVERSITY = [
  "CLB Giai điệu trẻ",
  "Đội Văn nghệ Xung kích (VNXK)",
  "CLB Võ thuật",
  "CLB Dân ca",
  "Nhóm Truyền thông Sinh viên (S Communications)",
  "CLB Chuyện to nhỏ",
  "CLB Tiếng Pháp",
  "CLB Sinh viên Khởi nghiệp (DYNAMIC UEH)",
  "CLB Guitar (UEHG)",
  "CLB Bóng chuyền UEH",
  "Đội Công tác viên UEH",
  "CLB Cầu lông UEH (UBC)",
  "Đội Công tác xã hội (CTXH)",
  "BELL Club"
];

export const CLUBS_FACULTY = [
  "CLB Nghiên cứu Kinh tế Trẻ (YoRE)",
  "Nhóm SV Nghiên cứu Marketing (Margroup)",
  "Nhóm SV Nghiên cứu Du lịch (Travelgroup)",
  "CLB Chứng khoán (SCUE)",
  "CLB Kế toán - Kiểm toán (A²C)",
  "CLB Nhân sự - Khởi nghiệp (HR-STARTUP)",
  "CLB Bất động sản (REC)",
  "Nhóm Hỗ trợ Sinh viên (SSG)",
  "Nhóm SV Nghiên cứu Tài chính (SFR)",
  "CLB Tiếng Anh (Apple Club)",
  "Nhóm SV Nghiên cứu Thuế (TaxGroup)",
  "CLB Kinh doanh Quốc tế (IBC)",
  "CLB Thương mại (I.C)",
  "CLB Công nghệ Kinh tế (ET Club)",
  "CLB Chuyên viên Nhân sự Tập sự (HuReA)",
  "CLB Lý luận trẻ"
];

export const CRITERIA_DATA: Criterion[] = [
  {
    id: '1',
    label: 'I. Ý thức tham gia học tập, NCKH (Tối đa 20 điểm)',
    type: InputType.GROUP,
    maxPoints: 20,
    children: [
      {
        id: '1.1',
        label: '1.1. Ý thức học tập tại UEH',
        type: InputType.BOOLEAN,
        points: 5,
      },
      {
        id: '1.2',
        label: '1.2. Kết quả học tập (Điểm TB tích lũy)',
        type: InputType.SELECT,
        maxPoints: 5,
        options: [
          { id: '1.2.1.1', label: 'Yếu (0 điểm)', value: 0 },
          { id: '1.2.1.2', label: 'Kém (1 điểm)', value: 1 },
          { id: '1.2.1.3', label: 'Trung bình (2 điểm)', value: 2 },
          { id: '1.2.1.4', label: 'Khá (3 điểm)', value: 3 },
          { id: '1.2.1.5', label: 'Giỏi (4 điểm)', value: 4 },
          { id: '1.2.1.6', label: 'Xuất sắc (5 điểm)', value: 5 },
        ],
      },
      {
        id: '1.3',
        label: '1.3. Tham gia trao đổi sinh viên (Tối đa 10 điểm)',
        type: InputType.GROUP,
        maxPoints: 10,
        children: [
          {
            id: '1.3.1',
            label: 'Trong nước',
            type: InputType.SELECT,
            maxPoints: 5,
            options: [
              { id: '1.3.1.1', label: 'Ngắn hạn (< 4 tuần)', value: 3 },
              { id: '1.3.1.2', label: 'Dài hạn (≥ 4 tuần)', value: 5 },
            ],
          },
          {
            id: '1.3.2',
            label: 'Quốc tế',
            type: InputType.SELECT,
            maxPoints: 10,
            options: [
              { id: '1.3.2.1', label: 'Ngắn hạn (< 4 tuần)', value: 5 },
              { id: '1.3.2.2', label: 'Dài hạn (≥ 4 tuần)', value: 10 },
            ],
          },
        ],
      },
      {
        id: '1.4',
        label: '1.4. Thành viên đội tuyển UEH dự thi cấp trên/tương đương (5đ/cuộc thi)',
        type: InputType.NUMBER,
        points: 5,
        maxPoints: 10,
      },
      {
        id: '1.5',
        label: '1.5. Hoàn thành học phần Thực tập và tốt nghiệp',
        type: InputType.BOOLEAN,
        points: 5,
      },
      {
        id: '1.6',
        label: '1.6. Nghiên cứu khoa học (Công trình, bài báo...)',
        type: InputType.GROUP,
        maxPoints: 5,
        children: [
          {
            id: '1.6.1',
            label: 'Hoạt động cấp UEH (2đ/đề tài)',
            type: InputType.NUMBER,
            points: 2,
            maxPoints: 4,
          },
          {
            id: '1.6.2',
            label: 'Cấp khoa/viện/trường thành viên (1.5đ/đề tài)',
            type: InputType.NUMBER,
            points: 1.5,
            maxPoints: 3,
          },
          {
            id: '1.6.3',
            label: 'Ngoài UEH (cấp trên/tương đương)',
            type: InputType.BOOLEAN,
            points: 5,
          },
        ],
      },
      {
        id: '1.7',
        label: '1.7. Hoạt động ngoại khóa về khởi nghiệp, đổi mới sáng tạo',
        type: InputType.GROUP,
        maxPoints: 10,
        children: [
          { id: '1.7.1', label: 'Thành viên CLB/đội/nhóm khởi nghiệp tại UEH', type: InputType.BOOLEAN, points: 1 },
          {
             id: '1.7.2',
             label: 'Thành viên Ban Tổ chức (BTC) hoạt động ngoại khóa',
             type: InputType.GROUP,
             maxPoints: 10,
             children: [
                 { id: '1.7.2.1', label: 'Cấp UEH - Tham dự (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 5},
                 { id: '1.7.2.2', label: 'Cấp Khoa/Viện - Tham dự (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 5},
                 { id: '1.7.2.3', label: 'Cấp UEH/Trường TV - Thành viên BTC (2đ/lần)', type: InputType.NUMBER, points: 2 },
                 { id: '1.7.2.4', label: 'Cấp Khoa/Viện - Thành viên BTC (2đ/lần)', type: InputType.NUMBER, points: 2 },
                 { id: '1.7.2.5', label: 'Ngoài UEH - Tham gia/Tổ chức (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 2 },
             ]
          },
           {
             id: '1.7.3',
             label: 'Thành viên BTC, thí sinh dự thi khởi nghiệp',
             type: InputType.GROUP,
             maxPoints: 10,
             children: [
                 { id: '1.7.3.1', label: 'Thí sinh cấp UEH/Trường TV (2đ/cuộc thi)', type: InputType.NUMBER, points: 2, maxPoints: 5},
                 { id: '1.7.3.2', label: 'Thí sinh cấp Khoa/Viện (2đ/cuộc thi)', type: InputType.NUMBER, points: 2, maxPoints: 5},
                 { id: '1.7.3.3', label: 'BTC cấp UEH/Trường TV (2đ/lần)', type: InputType.NUMBER, points: 2 },
                 { id: '1.7.3.4', label: 'BTC cấp Khoa/Viện (2đ/lần)', type: InputType.NUMBER, points: 2 },
                 { id: '1.7.3.5', label: 'Ngoài UEH - Tham gia/Tổ chức (1đ/cuộc thi)', type: InputType.NUMBER, points: 1, maxPoints: 2 },
             ]
          }
        ],
      },
       {
        id: '1.8',
        label: '1.8. Hoạt động ngoại khóa về học thuật, khoa học, công nghệ',
        type: InputType.GROUP,
        maxPoints: 10,
        children: [
            { id: '1.8.1', label: 'Thành viên CLB học thuật tại UEH', type: InputType.BOOLEAN, points: 1 },
            {
             id: '1.8.2',
             label: 'Thành viên BTC, tham gia hoạt động',
             type: InputType.GROUP,
             maxPoints: 10,
             children: [
                 { id: '1.8.2.1', label: 'Cấp UEH - Tham dự (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 5},
                 { id: '1.8.2.2', label: 'Cấp Khoa/Viện - Tham dự (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 5},
                 { id: '1.8.2.3', label: 'Cấp UEH - Thành viên BTC (2đ/lần)', type: InputType.NUMBER, points: 2 },
                 { id: '1.8.2.4', label: 'Cấp Khoa/Viện - Thành viên BTC (2đ/lần)', type: InputType.NUMBER, points: 2 },
                 { id: '1.8.2.5', label: 'Ngoài UEH - Tham gia/Tổ chức (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 2 },
             ]
          },
          {
             id: '1.8.3',
             label: 'Thí sinh, thành viên đội nhóm dự thi học thuật',
             type: InputType.GROUP,
             maxPoints: 10,
             children: [
                 { id: '1.8.3.1', label: 'Thí sinh cấp UEH (2đ/cuộc thi)', type: InputType.NUMBER, points: 2, maxPoints: 5},
                 { id: '1.8.3.2', label: 'Thí sinh cấp Khoa/Viện (2đ/cuộc thi)', type: InputType.NUMBER, points: 2, maxPoints: 5},
                 { id: '1.8.3.3', label: 'BTC cấp UEH (2đ/lần)', type: InputType.NUMBER, points: 2 },
                 { id: '1.8.3.4', label: 'BTC cấp Khoa/Viện (2đ/lần)', type: InputType.NUMBER, points: 2 },
                 { id: '1.8.3.5', label: 'Ngoài UEH (2đ/cuộc thi)', type: InputType.NUMBER, points: 2, maxPoints: 4 },
             ]
          }
        ]
       },
      // Negative points
      {
        id: '1.9',
        label: 'Vi phạm/Thiếu ý thức tham gia (Điểm trừ)',
        type: InputType.GROUP,
        isDeduction: true,
        maxPoints: -10, // Represents the floor limit (max deduction)
        children: [
           { id: '1.9.1', label: 'Bị đề nghị xử lý từ BTC chương trình (-3đ/lần)', type: InputType.NUMBER, points: -3, isDeduction: true },
           { id: '1.9.2', label: 'Nhờ người tham gia hộ (-5đ/lần)', type: InputType.NUMBER, points: -5, isDeduction: true },
        ]
      },
      {
        id: '1.10',
        label: 'Vi phạm quy chế học tập (Điểm trừ)',
        type: InputType.GROUP,
        isDeduction: true,
        maxPoints: -10,
        children: [
           { id: '1.10.1', label: 'Vi phạm quy định học vụ/khảo thí (-2đ/lần)', type: InputType.NUMBER, points: -2, isDeduction: true },
           { id: '1.10.2', label: 'Bị khiển trách thi kết thúc học phần (-3đ/lần)', type: InputType.NUMBER, points: -3, isDeduction: true },
           { id: '1.10.3', label: 'Bị cảnh cáo thi kết thúc học phần (-5đ/lần)', type: InputType.NUMBER, points: -5, isDeduction: true },
           { id: '1.10.4', label: 'Bị đình chỉ thi kết thúc học phần (-10đ/lần)', type: InputType.NUMBER, points: -10, isDeduction: true },
        ]
      }
    ],
  },
  {
    id: '2',
    label: 'II. Ý thức chấp hành nội quy, quy chế (Tối đa 25 điểm)',
    type: InputType.GROUP,
    maxPoints: 25,
    children: [
      { id: '2.1', label: '2.1. Ý thức chấp hành nội quy, quy chế, quy định', type: InputType.BOOLEAN, points: 15 },
      {
        id: '2.2',
        label: '2.2. Tuần sinh hoạt công dân - Sinh viên',
        type: InputType.SELECT,
        maxPoints: 10,
        options: [
            { id: '2.2.1', label: 'Đạt (học bù) (5 điểm)', value: 5 },
            { id: '2.2.2', label: 'Đạt (chính thức) (10 điểm)', value: 10 }
        ]
      },
      {
        id: '2.3',
        label: '2.3. Vi phạm nội quy, văn hóa trường học (Điểm trừ)',
        type: InputType.GROUP,
        isDeduction: true,
        maxPoints: -10,
        children: [
            { id: '2.3.1', label: 'Thiếu ý thức kê khai ĐRL (-5đ/lần)', type: InputType.NUMBER, points: -5, isDeduction: true },
            { id: '2.3.2', label: 'Vắng SH lớp/SHCD/SH chính trị (-2đ/lần)', type: InputType.NUMBER, points: -2, isDeduction: true },
        ]
      },
      {
          id: '2.4',
          label: '2.4. Kỷ luật (Điểm trừ)',
          type: InputType.GROUP,
          isDeduction: true,
          maxPoints: -10,
          children: [
            { id: '2.4.1', label: 'Khiển trách (-2đ/lần)', type: InputType.NUMBER, points: -2, isDeduction: true },
            { id: '2.4.2', label: 'Cảnh cáo (-5đ/lần)', type: InputType.NUMBER, points: -5, isDeduction: true },
            { id: '2.4.3', label: 'Đình chỉ học tập (-10đ)', type: InputType.BOOLEAN, points: -10, isDeduction: true },
          ]
      }
    ],
  },
  {
    id: '3',
    label: 'III. Hoạt động chính trị, xã hội, văn hóa, thể thao (Tối đa 20 điểm)',
    type: InputType.GROUP,
    maxPoints: 20,
    children: [
        {
            id: '3.1',
            label: '3.1. Thành viên đội tuyển UEH dự thi (Chính trị/XH/VH/TT)',
            type: InputType.NUMBER,
            points: 5,
            maxPoints: 10
        },
        { id: '3.2', label: '3.2. Được kết nạp Đảng Cộng sản Việt Nam', type: InputType.BOOLEAN, points: 10 },
        {
            id: '3.3',
            label: '3.3. Hoạt động bền vững, đại học xanh, bảo vệ môi trường',
            type: InputType.GROUP,
            maxPoints: 10,
            children: [
                { id: '3.3.1', label: 'Thành viên CLB/đội/nhóm môi trường tại UEH', type: InputType.BOOLEAN, points: 1 },
                {
                    id: '3.3.2',
                    label: 'Tham dự/Thành viên BTC hoạt động môi trường',
                    type: InputType.GROUP,
                    maxPoints: 10,
                    children: [
                        { id: '3.3.2.1', label: 'Cấp UEH - Tham dự (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 5 },
                        { id: '3.3.2.2', label: 'Cấp Khoa/Viện - Tham dự (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 5 },
                        { id: '3.3.2.3', label: 'Cấp UEH - BTC (2đ/lần)', type: InputType.NUMBER, points: 2 },
                        { id: '3.3.2.4', label: 'Cấp Khoa/Viện - BTC (2đ/lần)', type: InputType.NUMBER, points: 2 },
                        { id: '3.3.2.5', label: 'Ngoài UEH (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 2 },
                    ]
                },
                {
                     id: '3.3.3',
                     label: 'Dự thi về môi trường/đại học xanh',
                     type: InputType.GROUP,
                     maxPoints: 10,
                     children: [
                         { id: '3.3.3.1', label: 'Thí sinh cấp UEH (2đ/cuộc thi)', type: InputType.NUMBER, points: 2, maxPoints: 5 },
                         { id: '3.3.3.2', label: 'Thí sinh cấp Khoa/Viện (2đ/cuộc thi)', type: InputType.NUMBER, points: 2, maxPoints: 5 },
                         { id: '3.3.3.3', label: 'BTC cấp UEH (2đ/lần)', type: InputType.NUMBER, points: 2 },
                         { id: '3.3.3.4', label: 'BTC cấp Khoa/Viện (2đ/lần)', type: InputType.NUMBER, points: 2 },
                         { id: '3.3.3.5', label: 'Ngoài UEH (1đ/cuộc thi)', type: InputType.NUMBER, points: 1, maxPoints: 2 },
                     ]
                }
            ]
        },
        {
            id: '3.4',
            label: '3.4. Hoạt động chính trị - xã hội, văn hóa, nghệ thuật, thể thao',
            type: InputType.GROUP,
            maxPoints: 10,
            children: [
                { id: '3.4.1', label: 'Thành viên CLB/đội/nhóm phong trào/tình nguyện', type: InputType.BOOLEAN, points: 1 },
                {
                    id: '3.4.2',
                    label: 'Tham dự/Thành viên BTC hoạt động phong trào',
                    type: InputType.GROUP,
                    maxPoints: 10,
                    children: [
                        { id: '3.4.2.1', label: 'Cấp UEH - Tham dự (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 5 },
                        { id: '3.4.2.2', label: 'Cấp Khoa/Viện - Tham dự (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 5 },
                        { id: '3.4.2.3', label: 'Cấp UEH - BTC (2đ/lần)', type: InputType.NUMBER, points: 2 },
                        { id: '3.4.2.4', label: 'Cấp Khoa/Viện - BTC (2đ/lần)', type: InputType.NUMBER, points: 2 },
                        { id: '3.4.2.5', label: 'Ngoài UEH (1đ/hoạt động)', type: InputType.NUMBER, points: 1, maxPoints: 2 },
                    ]
                },
                {
                    id: '3.4.3',
                    label: 'Dự thi phong trào/tình nguyện',
                    type: InputType.GROUP,
                    maxPoints: 5,
                    children: [
                        { id: '3.4.3.1', label: 'Thí sinh cấp UEH (2đ/cuộc thi)', type: InputType.NUMBER, points: 2, maxPoints: 5 },
                        { id: '3.4.3.2', label: 'Thí sinh cấp Khoa/Viện (2đ/cuộc thi)', type: InputType.NUMBER, points: 2, maxPoints: 5 },
                        { id: '3.4.3.3', label: 'BTC cấp UEH (2đ/lần)', type: InputType.NUMBER, points: 2 },
                        { id: '3.4.3.4', label: 'BTC cấp Khoa/Viện (2đ/lần)', type: InputType.NUMBER, points: 2 },
                        { id: '3.4.3.5', label: 'Ngoài UEH (1đ/cuộc thi)', type: InputType.NUMBER, points: 1, maxPoints: 2 },
                    ]
                }
            ]
        },
        {
            id: '3.5',
            label: 'Vi phạm hoạt động phong trào (Điểm trừ)',
            type: InputType.GROUP,
            isDeduction: true,
            maxPoints: -15,
            children: [
                { id: '3.5.1', label: 'Bị đề nghị xử lý từ BTC (-3đ/lần)', type: InputType.NUMBER, points: -3, isDeduction: true },
                { id: '3.5.2', label: 'Vi phạm quy định ĐH Xanh (-5đ/lần)', type: InputType.NUMBER, points: -5, isDeduction: true },
                { id: '3.5.3', label: 'Nhờ người tham gia hộ (-5đ/lần)', type: InputType.NUMBER, points: -5, isDeduction: true },
            ]
        }
    ],
  },
  {
    id: '4',
    label: 'IV. Ý thức công dân trong quan hệ cộng đồng (Tối đa 25 điểm)',
    type: InputType.GROUP,
    maxPoints: 25,
    children: [
      { id: '4.1', label: '4.1. Sinh hoạt tại cộng đồng (Nơi cư trú)', type: InputType.BOOLEAN, points: 20 },
      {
        id: '4.2',
        label: '4.2. Thành tích/Hoạt động tại cộng đồng',
        type: InputType.GROUP,
        maxPoints: 5,
        children: [
           {
               id: '4.2.1',
               label: 'Tích cực tham gia hoạt động tại địa phương',
               type: InputType.GROUP,
               maxPoints: 2,
               children: [
                   { id: '4.2.1.1', label: 'Kê khai thông tin nội/ngoại trú', type: InputType.BOOLEAN, points: 2 },
                   { id: '4.2.1.2', label: 'Tham gia hoạt động chính quyền/đoàn thể', type: InputType.BOOLEAN, points: 2 },
               ]
           },
           { id: '4.2.2', label: 'Tham gia tình nguyện vì cộng đồng (Hiến máu, Tiếp sức mùa thi...) (2.5đ/lần)', type: InputType.NUMBER, points: 2.5, maxPoints: 5 },
           { id: '4.2.3', label: 'Chiến sĩ chiến dịch tình nguyện SV UEH (Mùa hè xanh...)', type: InputType.BOOLEAN, points: 5 },
           {
               id: '4.2.4',
               label: 'Giấy khen chính quyền địa phương',
               type: InputType.GROUP,
               maxPoints: 5,
               children: [
                   { id: '4.2.4.1', label: 'Cấp xã/phường/đặc khu (2.5đ/giấy)', type: InputType.NUMBER, points: 2.5, maxPoints: 5 },
                   { id: '4.2.4.2', label: 'Cấp tỉnh/thành phố (5đ/giấy)', type: InputType.NUMBER, points: 5, maxPoints: 5 },
               ]
           }
        ]
      },
      {
          id: '4.3',
          label: '4.3. Vi phạm tại địa phương/nơi cư trú (Điểm trừ)',
          type: InputType.NUMBER,
          points: -5,
          isDeduction: true,
          maxPoints: -25
      }
    ],
  },
  {
    id: '5',
    label: 'V. Tham gia công tác cán bộ lớp, đoàn thể (Tối đa 10 điểm)',
    type: InputType.GROUP,
    maxPoints: 10,
    children: [
      {
        id: '5.1',
        label: '5.1. Hoàn thành nhiệm vụ quản lý (Chọn chức vụ cao nhất)',
        type: InputType.SELECT,
        maxPoints: 5,
        options: [
          { id: '5.1.1', label: 'Ban cán sự lớp (2đ)', value: 2 },
          { id: '5.1.2', label: 'BCH Chi đoàn (2đ)', value: 2 },
          { id: '5.1.3', label: 'BCH Chi hội (2đ)', value: 2 },
          { id: '5.1.4', label: 'BDH CLB/Đội/Nhóm (3đ)', value: 3 },
          { id: '5.1.5', label: 'BCH Đoàn khoa/viện (4đ)', value: 4 },
          { id: '5.1.6', label: 'BCH LCH SV khoa/viện (4đ)', value: 4 },
          { id: '5.1.7', label: 'BCH Đoàn UEH (5đ)', value: 5 },
          { id: '5.1.8', label: 'BCH HSV UEH (5đ)', value: 5 },
          { id: '5.1.9', label: 'Cấp ủy Chi bộ SV (5đ)', value: 5 },
        ]
      },
      {
        id: '5.2',
        label: '5.2. Hỗ trợ tích cực hoạt động chung',
        type: InputType.GROUP,
        maxPoints: 5,
        children: [
            { id: '5.2.1', label: 'Hỗ trợ lớp/quản lý lớp', type: InputType.BOOLEAN, points: 3 },
            { id: '5.2.2', label: 'Hỗ trợ Khoa/Viện', type: InputType.BOOLEAN, points: 4 },
            { id: '5.2.3', label: 'Hỗ trợ Trường/Đơn vị quản lý', type: InputType.BOOLEAN, points: 5 },
        ]
      },
      {
        id: '5.3',
        label: '5.3. Đạt giải thưởng, khen thưởng (Tối đa 10 điểm)',
        type: InputType.GROUP,
        maxPoints: 10,
        children: [
            {
                id: '5.3.1',
                label: 'Giải thưởng/Thành tích cuộc thi',
                type: InputType.GROUP,
                maxPoints: 5,
                children: [
                    { id: '5.3.1.1', label: 'Cấp Khoa/Viện (2đ/giải)', type: InputType.NUMBER, points: 2 },
                    { id: '5.3.1.2', label: 'Cấp UEH (2.5đ/giải)', type: InputType.NUMBER, points: 2.5 },
                    { id: '5.3.1.3', label: 'NCKH cấp Trường (2.5đ/giải)', type: InputType.NUMBER, points: 2.5 },
                ]
            },
            {
                id: '5.3.3',
                label: 'Danh hiệu Sinh viên 5 tốt',
                type: InputType.SELECT,
                maxPoints: 2,
                options: [
                    { id: '5.3.3.1', label: 'Cấp Khoa/Viện/KTX (1đ)', value: 1 },
                    { id: '5.3.3.2', label: 'Cấp UEH (2đ)', value: 2 },
                ]
            },
            { id: '5.3.4', label: 'Giấy khen Đoàn/Hội (ngoài SV5T) (2đ)', type: InputType.BOOLEAN, points: 2 }
        ]
      }
    ],
  },
  {
    id: '6',
    label: 'VI. Cộng điểm rèn luyện đặc biệt (Tối đa 10 điểm)',
    type: InputType.GROUP,
    maxPoints: 10,
    children: [
      {
         id: '6.1',
         label: '6.1. Thành tích xuất sắc tại UEH',
         type: InputType.GROUP,
         maxPoints: 5,
         children: [
             { id: '6.1.1', label: 'Giấy khen Giám đốc UEH', type: InputType.BOOLEAN, points: 5 },
             { id: '6.1.2', label: 'Giấy khen Bí thư Đảng ủy UEH', type: InputType.BOOLEAN, points: 5 },
             { id: '6.1.3', label: 'Công dân xanh UEH', type: InputType.BOOLEAN, points: 5 },
         ]
      },
      {
          id: '6.2',
          label: '6.2. Thành tích xuất sắc cấp Tỉnh/Thành trở lên',
          type: InputType.GROUP,
          maxPoints: 10,
          children: [
              { id: '6.2.1', label: 'Giải thưởng/SV5T/NCKH cấp Tỉnh/Thành (5đ)', type: InputType.BOOLEAN, points: 5 },
              { id: '6.2.2', label: 'Bằng khen cấp Tỉnh/Thành/Trung ương (10đ)', type: InputType.BOOLEAN, points: 10 },
          ]
      },
      { id: '6.3', label: '6.3. Sinh viên khuyết tật/hoàn cảnh đặc biệt', type: InputType.BOOLEAN, points: 10 }
    ],
  },
];