import { Tenant } from 'src/tenants/entities/tenant.entity';
import { v4 as uuidv4 } from 'uuid';

export const Mock_Tenant: Tenant[] = [
  {
    id: uuidv4(),
    create_On: new Date(),
    update_On: new Date(),
    name: 'Sunset Beach Resort',
    description: 'A luxurious beachfront resort with stunning ocean views',
  },
  {
    id: uuidv4(),
    create_On: new Date(),
    update_On: new Date(),
    name: 'Mountain View Lodge',
    description:
      'Cozy mountain retreat offering scenic hiking trails and ski access',
  },
  {
    id: uuidv4(),
    create_On: new Date(),
    update_On: new Date(),
    name: 'City Center Suites',
    description:
      'Modern urban hotel in the heart of downtown, perfect for business travelers',
  },
];

// export const Mock_TenantList: IResponseList<ITenant> = {
//   data: Mock_Tenant,
//   pagination: {
//     total: Mock_Tenant.length,
//     page: 1,
//     perPage: K_PerPage,
//     pages: Math.ceil(Mock_Tenant.length / K_PerPage),
//   },
// };
