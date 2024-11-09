CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT * FROM pg_timezone_names;
ALTER DATABASE "dev_dbtask" SET timezone TO "Asia/Jakarta";

-- CreateTable
CREATE TABLE "task" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);
