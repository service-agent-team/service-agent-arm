import { AiOutlineDashboard } from 'react-icons/ai';
import { CiViewList } from 'react-icons/ci';
import { FaBookReader } from 'react-icons/fa';
import { MdImportContacts } from 'react-icons/md';

export const navigation = [
	{
		title: 'General',
		links: [
			{
				label: 'Explore',
				route: '/',
				icon: AiOutlineDashboard,
			},
			{
				label: 'Courses',
				route: '/courses',
				icon: CiViewList,
			},
			{
				label: 'Books',
				route: '/books',
				icon: FaBookReader,
			},
			{
				label: 'Articles',
				route: '/articles',
				icon: MdImportContacts,
			},
		],
	}
];