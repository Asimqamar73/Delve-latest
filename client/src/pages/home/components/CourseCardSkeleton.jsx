import React from "react";

function CourseCardSkeleton() {
  return (
    <div class="shadow rounded-md p-4 max-w-sm w-full">
      <div class="animate-pulse ">
        <div class=" bg-slate-700 h-36 "></div>
        <div class="flex-1 space-y-6 py-2">
          <div class="h-2 bg-slate-700 rounded"></div>
          <div class="h-2 bg-slate-700 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCardSkeleton;
