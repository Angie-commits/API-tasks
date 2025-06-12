-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "task_title" TEXT NOT NULL,
    "Task_description" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
