-- CreateTable
CREATE TABLE "People" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rt_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rt" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Rt_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Group" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "People" ADD CONSTRAINT "People_rt_id_fkey" FOREIGN KEY ("rt_id") REFERENCES "Rt"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "People" ADD CONSTRAINT "People_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
