import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class Exception{
  prisma(exception: PrismaClientKnownRequestError){
    if(exception.code === 'P2002'){
      return `${String(exception.meta?.target).replace(/Fund|key|_/g, '')} is unique`
    }
    console.log(exception)
    return 'erro database'
  }
}