-- DropForeignKey
ALTER TABLE "People" DROP CONSTRAINT "People_group_id_fkey";

-- DropForeignKey
ALTER TABLE "People" DROP CONSTRAINT "People_rt_id_fkey";

-- AlterTable
ALTER TABLE "People" ALTER COLUMN "rt_id" DROP NOT NULL,
ALTER COLUMN "group_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "People" ADD CONSTRAINT "People_rt_id_fkey" FOREIGN KEY ("rt_id") REFERENCES "Rt"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "People" ADD CONSTRAINT "People_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("name") ON DELETE SET NULL ON UPDATE CASCADE;
