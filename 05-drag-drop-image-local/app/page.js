"use client";
import React, { useState } from "react";
import {
  DndContext,
  MouseSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import photos from "./../photos.json";
import { Grid } from "./components/Grid";
import { SortablePhoto } from "./components/SortablePhoto";
import { Photo } from "./components/Photo";

const Home = () => {
  const [items, setItems] = useState(photos);

  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor));

  return (
    <div className="lg:mx-96 mx-20 my-20 p-4 bg-slate-100 shadow-lg rounded">
      <Grid columns={5}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items}>
            {items.map((url, index) => (
              <SortablePhoto key={url} url={url} index={index} />
            ))}
          </SortableContext>

          <DragOverlay adjustScale={true}>
            {activeId ? (
              <Photo url={activeId} index={items.indexOf(activeId)} />
            ) : null}
          </DragOverlay>
        </DndContext>
        <div>upload</div>
      </Grid>
    </div>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
};

export default Home;
