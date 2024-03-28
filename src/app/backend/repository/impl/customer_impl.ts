import {
  Customer,
  CustomerType,
  PrismaClient,
  StatusRequestOwner,
  Vehicle,
} from "@prisma/client";
import { ICustomer } from "../icustomer";
import prisma from "@/app/backend/config/prismaSingleton";
import { ApiError } from "../../exception/baseError";

class CustomerRepository implements ICustomer {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async insert(
    email: string,
    password: string,
    fullname: string,
    phone: string,
    type: CustomerType,
    cname?: string
  ): Promise<Customer | null> {
    /* 

        @TODO : add data or record into customer table  
    */
    return null;
  }

  getCustomerByEmail = async (email: string): Promise<Customer | null> => {
    /* 

        @TODO : get customer by email
        @param:  email  
    */

    return null;
  };

  getCustomerById = async (custId: string): Promise<Customer | null> => {
    /* 

        @TODO : get data or record by customer id
        @param: customer id  
    */

    return null;
  };

  requestOwner = async (customerId: string): Promise<string | null> => {
    const requsetOwner = await this.repository.ownerRequestHistory.create({
      data: {
        customerId: customerId,
        status: StatusRequestOwner.requested,
      },
    });

    if (!requsetOwner) {
      return null;
    }
    return "request is success. waiting for admin reviewing";
  };
  async isOwner(customerId: string): Promise<string> {
    const history = await this.repository.ownerRequestHistory.findFirst({
      where: { customerId },
    });

    if (!history) {
      return "notOwner";
    }

    if (
      history.status.toLowerCase() ===
      StatusRequestOwner.requested.toLowerCase()
    ) {
      return "pending";
    }

    return "isOwner";
  }

  getVehicleListByCustomerId = async (
    custId: string
  ): Promise<Vehicle[] | []> => {
    const vehicleList = await this.repository.vehicle.findMany({
      where: {
        owner: { customer: { id: custId } },
      },
      include: {
        owner: { include: { customer: true } },
      },
    });

    return vehicleList;
  };
}

export default CustomerRepository;
